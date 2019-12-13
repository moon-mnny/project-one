$(() => {


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
  
    var testObject =  {
        id: "test",
        name: "testtest",
        ingredients: "testtesttest"

     }
    

  
  $("#userInfo").click((e) => {
    e.preventDefault();
    db.collection("users").doc().set(testObject);
      
  
    })
    .then(() => {
        console.log("user info saved");
        
    })
    .catch((error) =>  {
        console.error("Error adding document: ", error);
    });
  });

});