import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALaraISwXQcTjbLaMmbuv5k82b_FAiDe4",
  authDomain: "humawave.firebaseapp.com",
  projectId: "humawave",
  storageBucket: "humawave.appspot.com",
  messagingSenderId: "712252136933",
  appId: "1:712252136933:web:1395520f8296475965e30c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence).then(() => {
  // Persistence is set to LOCAL
}).catch((error) => {
  console.error('Error setting persistence:', error);
});

document.addEventListener('DOMContentLoaded', () => {
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
    }
  });
});
