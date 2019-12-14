var firebaseConfig = {
  apiKey: "AIzaSyBf1Ulnb618Uos69ZB7Ti0mZ6tUev842xk",
  authDomain: "project-one-b8f55.firebaseapp.com",
  databaseURL: "https://project-one-b8f55.firebaseio.com",
  projectId: "project-one-b8f55",
  storageBucket: "project-one-b8f55.appspot.com",
  messagingSenderId: "558983366534",
  appId: "1:558983366534:web:a71ad15fe65c9ac9964e07"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

var currentUser = {};

const userRef = db.collection("users").doc("LCaIJje6quQOd5NOc9Cw")
userRef.onSnapshot(doc => {
  if (doc.exists) {
    var userData = doc.data();
    console.log("[DEBUG] user LCaIJje6quQOd5NOc9Cw updated ::", userData);
    currentUser = {
      id: "LCaIJje6quQOd5NOc9Cw",
      ...userData
    }
  } else {
    console.warn("[WARNING] user LCaIJje6quQOd5NOc9Cw does not exist");
  }
});


