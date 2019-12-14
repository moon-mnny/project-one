
const qs = selector => document.querySelector(selector);
// references to our count elements
const saved = qs(".saveButton");
const text = qs(".idRecipe");
var recipe=[262825]

       // initialize state
    //    var count = "262825";
       // update UI and state on button click
       saved.addEventListener("click", () => {
         
         text.textContent = text;
         countRef
           .update({
             text: firebase.firestore.FieldValue.arrayUnion(recipe[0])
           })
           .then(() => console.log("updated the count successfully!"));
       });

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
      const countRef = db.collection("users").doc("6AqEslwCOj4wCVoNv1tM")
      countRef.onSnapshot(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          count = doc.data().text;
          text.textContent = count;
        } else {
          // doc.data() will be undefined in this case
          console.warn("No such document!");
        }
      });
