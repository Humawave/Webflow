import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

async function fetchFirebaseConfig() {
  try {
    const response = await fetch('https://northamerica-northeast2-humawave.cloudfunctions.net/getFirebaseConfig');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Firebase configuration:', error);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const firebaseConfig = await fetchFirebaseConfig();

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Set persistence to LOCAL
    await setPersistence(auth, browserLocalPersistence);

    const myAccountButton = document.getElementById('my-account');
    const accountFirstName = document.getElementById('account-first-name');

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, set the account button to redirect to the account page
        console.log('User is signed in:', user);
        if (myAccountButton) {
          myAccountButton.addEventListener('click', () => {
            window.location.href = 'https://www.humawave.com/account';
          });
        }

        // Fetch user's data from Firestore
        const userDoc = doc(db, 'users', user.email);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Display user's first name
          if (accountFirstName) {
            accountFirstName.textContent = userData.firstName || 'User';
          }
        } else {
          console.log('No such document!');
        }
      } else {
        // No user is signed in, set the account button to redirect to the welcome page
        console.log('No user is signed in.');
        if (myAccountButton) {
          myAccountButton.addEventListener('click', () => {
            window.location.href = 'https://www.humawave.com/welcome';
          });
        }
      }
    });
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
});
