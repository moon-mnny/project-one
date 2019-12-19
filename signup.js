console.log("[DEBUG] JS loaded");
const currentUser = {};
const recipeSearchBtn = document.querySelector("#recipe-search-btn");
const spoonacularKey = "0d9362f34041402b8ec15c03ed3dead9";
var randomQueryURL = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${spoonacularKey}`;
$.ajax({
  type: "GET",
  url: randomQueryURL
}).then(function(response) {
  console.log(response.recipes);
  var randomTitle = response.recipes[0].creditsText;
  var randomCuisineType = response.recipes[0].cuisines.join(", ");
  var randomServing = response.recipes[0].servings;
  var randomTime = response.recipes[0].readyInMinutes;
  var randomImg = `url(${response.recipes[0].image})`;
  $("#recommendation-img").css("background-image", randomImg);
  $("#recommendation-title").html(randomTitle);
  $("#recommendation-summary").html(
    `Cuisine: ${randomCuisineType}<br> Serving: ${randomServing}<br> Time to prepare: ${randomTime}`
  );
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
var auth = firebase.auth();
// db.settings({ timestampsInSnapshots: true });
var userId;
$(".modal").modal();

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
      // db.collection("users").doc(cred.user.uid);
      $("#signup")[0].reset();
      $(".modal").hide();
      $("#userEmail").text(email);
    });
});
