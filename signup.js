$(() => {
  console.log("[DEBUG] JS loaded");

  $(".modal").modal();

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
  var auth = firebase.auth();
  // db.settings({ timestampsInSnapshots: true });





  $("#submit").click(e => {
    e.preventDefault();

    const email = $("#email")
      .val()
      .trim();
    const password = $("#pass")
      .val()
      .trim();
    console.log(email, password);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred);
        return db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            email: email,
            password: password
          });
      })
      .then(() => {
        console.log("User added");
        
      });
  });
});
