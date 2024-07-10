import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

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

    // Set persistence to LOCAL
    await setPersistence(auth, browserLocalPersistence);

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
        // No user is signed in, set the account button to redirect to the log-in page
        console.log('No user is signed in.');
        if (myAccountButton) {
          myAccountButton.addEventListener('click', () => {
            window.location.href = 'https://www.humawave.com/log-in';
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
