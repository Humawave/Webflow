import { initializeFirebase } from './firebaseSetup.js';
import { getTimeGreeting, getTimeEmoji, convertTo24HourFormat, calculateTimeDifference } from './utilityFunctions.js';
import { fetchUserData, fetchBookings } from './dataFetchers.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loader = document.getElementById('account-loading');

  function showLoader() {
    if (loader) {
      loader.style.display = 'flex';
    }
  }

  function hideLoader() {
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => {
        loader.style.display = 'none';
        loader.classList.remove('hide');
      }, 100);
    }
  }

  try {
    showLoader();
    const { auth, db } = await initializeFirebase();

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await fetchUserData(db, user.email);
        const bookings = await fetchBookings(db, user.email);

        if (userData) {
          const { firstName, lastName, referralCode } = userData;
          const greeting = getTimeGreeting();
          const emoji = getTimeEmoji();

          const accountWelcomeElement = document.getElementById('account-welcome');
          if (accountWelcomeElement) {
            accountWelcomeElement.textContent = `${greeting}, ${firstName} ${emoji}`;
          }

          const referralCodeInputElement = document.getElementById('account-referral-code');
          if (referralCodeInputElement) {
            referralCodeInputElement.value = referralCode;
            referralCodeInputElement.readOnly = true;
          }

          const shoppingComponent = document.getElementById('shopping-component');
          if (shoppingComponent) {
            shoppingComponent.classList.add('hidden');

            bookings.forEach(booking => {
              const bookingElement = shoppingComponent.cloneNode(true);
              bookingElement.classList.remove('hidden');
              const bookingDate = new Date(`${booking.day}T00:00:00`);
              const options = { weekday: 'long', month: 'long', day: 'numeric' };
              const bookingDateString = bookingDate.toLocaleDateString(undefined, options);

              const shoppingDateElement = bookingElement.querySelector('#shopping-date');
              if (shoppingDateElement) {
                shoppingDateElement.textContent = bookingDateString;
              }

              const shoppingStoreElement = bookingElement.querySelector('#shopping-stores');
              if (shoppingStoreElement) {
                shoppingStoreElement.textContent = booking.stores;
              }

              const shoppingTimeElement = bookingElement.querySelector('#shopping-time');
              if (shoppingTimeElement) {
                shoppingTimeElement.textContent = booking.time;
              }

              const accountFreeInitialElement = bookingElement.querySelector('#account-free-initial');
              const accountStandardSessionElement = bookingElement.querySelector('#account-standard-session');
              if (booking.referral && accountFreeInitialElement && accountStandardSessionElement) {
                accountFreeInitialElement.style.display = 'block';
                accountStandardSessionElement.style.display = 'none';
              } else if (accountFreeInitialElement && accountStandardSessionElement) {
                accountFreeInitialElement.style.display = 'none';
                accountStandardSessionElement.style.display = 'block';
              }

              const joinSessionButton = bookingElement.querySelector('#join-session');
              if (joinSessionButton) {
                const roomUrlWithName = `${booking.room}?name=${firstName}%20${lastName}`;
                joinSessionButton.setAttribute('data-room-url', roomUrlWithName);
                joinSessionButton.addEventListener('click', () => {
                  localStorage.setItem('roomURL', roomUrlWithName);
                  window.location.href = 'https://www.humawave.com/account/session';
                });

                const joinInTextElement = bookingElement.querySelector('#join-in');
                if (joinInTextElement) {
                  const formattedTime = convertTo24HourFormat(booking.time);
                  const sessionDateString = `${booking.day}T${formattedTime}:00`;
                  const sessionTime = new Date(sessionDateString.replace("AM", "").replace("PM", ""));
                  const updateJoinInText = () => {
                    const timeDiff = calculateTimeDifference(sessionTime);
                    joinInTextElement.textContent = `Join in ${timeDiff.hours} hours, ${timeDiff.minutes} minutes`;
                  };

                  updateJoinInText();
                  setInterval(updateJoinInText, 60000);
                }
              }

              shoppingComponent.parentNode.appendChild(bookingElement);
            });
          }
        }
      } else {
        const accountWelcomeElement = document.getElementById('account-welcome');
        if (accountWelcomeElement) {
          accountWelcomeElement.textContent = "Welcome!";
        }
      }
    });

    const signOutButton = document.getElementById('account-sign-out');
    if (signOutButton) {
      signOutButton.addEventListener('click', () => {
        signOut(auth).then(() => {
          window.location.href = 'https://www.humawave.com/';
        }).catch((error) => {
          console.error('Error signing out:', error);
        });
      });
    }
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  } finally {
    hideLoader();
  }
});
