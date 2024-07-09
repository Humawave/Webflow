import { getFirestore, doc, getDoc, collection, query, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

export async function fetchUserData(db, userEmail) {
  const userDoc = doc(db, "users", userEmail);
  const userSnap = await getDoc(userDoc);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return null;
  }
}

export async function fetchBookings(db, userEmail) {
  const bookingsRef = collection(db, "users", userEmail, "bookings");
  const q = query(bookingsRef);
  const querySnapshot = await getDocs(q);
  const bookings = [];

  querySnapshot.forEach((doc) => {
    bookings.push({ id: doc.id, ...doc.data() });
  });

  return bookings;
}
