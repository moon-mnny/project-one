const qs = selector => document.querySelector(selector);
const spoonacularKey = "0d9362f34041402b8ec15c03ed3dead9";
// references to our count elements
const saved = qs(".saveButton");
const text = qs(".idRecipe");
var recipe = [262825];

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
const recipeSearchBtn = document.querySelector("#recipe-search-btn");
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
const countRef = db.collection("users").doc("6AqEslwCOj4wCVoNv1tM");
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
for (var i = 0; i < recipe.length; i++) {
  console.log("Recipe ID is" + recipe[i]);
  var recipeURL =
    `https://api.spoonacular.com/recipes/${recipe[i]}/information?includeNutrition=false&apiKey=` +
    spoonacularKey;
  $.ajax({
    type: "GET",
    url: recipeURL
  }).then(function(response) {
    console.log(response);
    var saveRecipeTitle = response.creditsText;
    var saveRecipeImgURL = `url(${response.image})`;
    var saveServings = response.servings;
    var saveTime = response.cookingMinutes;
    var arr = [saveRecipeTitle, saveServings, saveTime, saveRecipeImgURL];
    console.log(arr);

    var newRecipeDiv = $("<div>").attr(
      "class",
      "recipe-div app-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop"
    );
    //Recipe Title Div

    var newTitleDiv = $("<div>").attr(
      "class",
      "recipe-title-div mdl-card__title mdl-card--expand mdl-color--red-300"
    );
    newTitleDiv.css("background-image", saveRecipeImgURL);
    var newTitleH2 = $("<h2>").attr(
      "class",
      "recipe-title mdl-card__title-text"
    );
    newTitleH2.html(saveRecipeTitle);
    newTitleDiv.append(newTitleH2);

    //Recipe Summary Div
    var newSummaryDiv = $("<div>").attr(
      "class",
      "recipe-summary-div mdl-card__supporting-text mdl-color-text--grey-600"
    );
    newSummaryDiv.html(`Serving: ${saveServings}<br>
    Time to prepare: ${saveTime}`);

    //Recipe Link
    var newRecipeLinkDiv = $("<div>").attr(
      "class",
      "recipe-link-div mdl-card__actions mdl-card--border"
    );
    var newRecipeLink = $("<a>").attr(
      "class",
      "mdl-button mdl-js-button mdl-js-ripple-effect"
    );
    newRecipeLink.html("Let's Make!!");
    newRecipeLinkDiv.append(newRecipeLink);
    //Like Button
    var likeButton = $("<button>").attr("id", `${recipe[i]}`);
    newRecipeLinkDiv.append(likeButton);

    likeButton.attr("type", "button");
    likeButton.attr("class", "like-button");

    newRecipeDiv.append(newTitleDiv);
    newRecipeDiv.append(newSummaryDiv);
    newRecipeDiv.append(newRecipeLinkDiv);
    //Append div in recipe body

    $("#recipes-body").append(newRecipeDiv);
  });
}
