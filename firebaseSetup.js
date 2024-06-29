import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, doc, getDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
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
    const shoppingSessionContainer = document.getElementById('shopping-session-container');

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, set the account button to redirect to the account page
        console.log('User is signed in:', user);
        if (myAccountButton) {
          myAccountButton.addEventListener('click', () => {
            window.location.href = 'https://www.humawave.com/account';
          });
        }

        // Fetch user's data from Firestore using UID
        const userDoc = doc(db, 'users', user.email);
        const userDocSnap = await getDoc(userDoc);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // Display user's first name
          if (accountFirstName) {
            accountFirstName.textContent = userData.firstName || 'User';
          }

          // Fetch user's bookings
          const bookingsCollection = collection(db, `users/${user.email}/bookings`);
          const bookingsSnapshot = await getDocs(bookingsCollection);

          bookingsSnapshot.forEach(doc => {
            const bookingData = doc.data();

            // Create a link block for each booking
            const shoppingSession = document.createElement('div');
            shoppingSession.setAttribute('id', 'shopping-session');
            shoppingSession.classList.add('shopping-session-class'); // Add your class for styling

            // Populate the link block with booking details
            const accountStores = document.createElement('div');
            accountStores.setAttribute('id', 'account-stores');
            accountStores.textContent = `Stores: ${bookingData.stores}`;

            const shoppingDate = document.createElement('div');
            shoppingDate.setAttribute('id', 'shopping-date');
            shoppingDate.textContent = `Date: ${formatDate(bookingData.day)}`;

            const shoppingTime = document.createElement('div');
            shoppingTime.setAttribute('id', 'shopping-time');
            shoppingTime.textContent = `Time: ${bookingData.time}`;

            // Append elements to the shopping session
            shoppingSession.appendChild(accountStores);
            shoppingSession.appendChild(shoppingDate);
            shoppingSession.appendChild(shoppingTime);

            // Append the shopping session to the container
            shoppingSessionContainer.appendChild(shoppingSession);
          });
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
