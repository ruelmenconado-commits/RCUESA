// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDRMe262iRUnVq8z3pt13FkZzAXlBQIj9s",
  authDomain: "rcuesa-app.firebaseapp.com",
  projectId: "rcuesa-app",
  storageBucket: "rcuesa-app.appspot.com",
  messagingSenderId: "46052324290",
  appId: "1:46052324290:android:15ff0aa714c203e84bdc5b"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Auth functions
function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Sign-up successful!"))
    .catch(error => alert("Sign-up error: " + error.message));
}

function logIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Logged in successfully!"))
    .catch(error => alert("Login error: " + error.message));
}

function logOut() {
  auth.signOut()
    .then(() => alert("Logged out."))
    .catch(error => alert("Logout error: " + error.message));
}

// Event & dues dummy handlers
function addEvent() {
  alert("Event added!");
  // Add real Firestore logic here
}

function recordDues() {
  alert("Dues recorded!");
  // Add real Firestore logic here
}
