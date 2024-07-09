import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

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

export async function initializeFirebase() {
  const firebaseConfig = await fetchFirebaseConfig();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  await setPersistence(auth, browserLocalPersistence);

  return { app, auth, db };
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const { auth } = await initializeFirebase();

    const myAccountButton = document.getElementById('my-account');

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the account button to redirect to the account page
        console.log('User is signed in:', user);
        if (myAccountButton) {
          myAccountButton.addEventListener('click', () => {
            window.location.href = 'https://www.humawave.com/account';
          });
        }
      } else {
        // No user is signed in, set the account button to redirect to the welcome page
        console.log('No user is signed in.');
        if (myAccountButton) {
          myAccountButton.addEventListener('click', () => {
            window.location.href = 'https://www.humawave.com/welcome';
          });
        }

        // Redirect to homepage if trying to access account pages
        if (window.location.pathname.startsWith('/account')) {
          window.location.href = 'https://www.humawave.com/';
        }
      }
    });
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
});
