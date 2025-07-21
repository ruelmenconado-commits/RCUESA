const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("main-section").style.display = "block";
        document.getElementById("user-email").textContent = user.email;
        loadDues();
    } else {
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("main-section").style.display = "none";
    }
});

function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password).catch(alert);
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password).catch(alert);
}

function logout() {
    auth.signOut();
}

function submitDues() {
    const user = auth.currentUser;
    const amount = document.getElementById("amount").value;
    const photoFile = document.getElementById("photo").files[0];
    if (!amount || !photoFile) return alert("Fill amount and choose a photo.");

    const ref = storage.ref("dues_photos/" + user.uid + "/" + photoFile.name);
    ref.put(photoFile).then(snapshot => snapshot.ref.getDownloadURL()).then(url => {
        return db.collection("dues").add({
            uid: user.uid,
            email: user.email,
            amount: parseFloat(amount),
            timestamp: new Date(),
            photoURL: url
        });
    }).then(() => {
        document.getElementById("amount").value = "";
        document.getElementById("photo").value = "";
        loadDues();
    }).catch(alert);
}

function loadDues() {
    const user = auth.currentUser;
    db.collection("dues").where("uid", "==", user.uid).orderBy("timestamp", "desc")
      .get().then(snapshot => {
        const list = document.getElementById("dues-list");
        list.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const li = document.createElement("li");
            li.textContent = `₱${data.amount} - ${new Date(data.timestamp.toDate()).toLocaleString()}`;
            list.appendChild(li);
        });
    });
}
