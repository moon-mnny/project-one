// console.log("hello");
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

recipeSearchBtn.addEventListener("click", function(event) {
  event.preventDefault();

  var cuisineSelectInput = document.querySelector("#cuisineSelect");
  var i = cuisineSelectInput.selectedIndex;
  var selectedCuisine = cuisineSelectInput.options[i].text;

  console.log(selectedCuisine);

  // search in spoonacular API and print on html

  var queryURL = `https://api.spoonacular.com/recipes/search?cuisine=${selectedCuisine}&number=5&apiKey=${spoonacularKey}`;

  $.ajax({
    type: "GET",
    url: queryURL
  }).then(function(response) {
    $("#recipes-body").empty();
    var results = response.results;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      //recipe infos
      var recipeId = results[i].id;
      var recipeTitle = results[i].title;
      var img = `<img class="resultImg" src="https://spoonacular.com/recipeImages/${response.results[i].image}">`;
      var recipeImg = `url(https://spoonacular.com/recipeImages/${response.results[i].image})`;
      var recipeServing = results[i].servings;
      var recipeTime = results[i].readyInMinutes;
      var recipeArr = [recipeId, recipeTitle, img, recipeServing, recipeTime];
      console.log(recipeArr);
      //individual recipe card
      var newRecipeDiv = $("<div>").attr(
        "class",
        "recipe-div app-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop"
      );
      //Recipe Title Div

      var newTitleDiv = $("<div>").attr(
        "class",
        "recipe-title-div mdl-card__title mdl-card--expand mdl-color--red-300"
      );
      newTitleDiv.css("background-image", recipeImg);
      var newTitleH2 = $("<h2>").attr(
        "class",
        "recipe-title mdl-card__title-text"
      );
      newTitleH2.html(recipeTitle);
      newTitleDiv.append(newTitleH2);

      //Recipe Summary Div
      var newSummaryDiv = $("<div>").attr(
        "class",
        "recipe-summary-div mdl-card__supporting-text mdl-color-text--grey-600"
      );
      newSummaryDiv.html(`Serving: ${recipeServing}<br>
      Time to prepare: ${recipeTime}`);

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
      var likeButtonDiv = $("<button>").text("LIKE BUTTON");
      newRecipeLinkDiv.append(newRecipeLink);
      newRecipeLinkDiv.append(likeButtonDiv);
      //Like Button

      //   var likeUnlike =
      //     currentUser.recipes.indexOf(recipeId) === -1 ? "like" : "unlike";
      //   var likeButton = `<button id=${recipeId} type="button" class="like-button" state="${likeUnlike}">${likeUnlike.toUpperCase()}</button>`;
      //   likeButtonDiv.html(likeButton);
      //   var likeUnlike =
      //     currentUser.recipes.indexOf(recipeId) === -1 ? "like" : "unlike";
      //   var likeButton = $("<button>").attr("id", `${recipeId}`);
      //   likeButton.attr("type", "check");
      //   likeButton.attr("state", `${likeUnlike}`);
      //   likeButton.html(`${likeUnlike.toUpperCase()}`);
      //   newRecipeLinkDiv.append(likeButton);
      //////Toggle not working ----- Still working/////////
      //   var likeBtnLabel = $("<label>").attr(
      //     "class",
      //     "like-buttons mdl-switch mdl-js-switch mdl-js-ripple-effect"
      //   );
      //   likeBtnLabel.attr("for", `icon-toggel-${i}`);

      //   var likeBtnInput = $("<input>").attr("type", "checkbox");
      //   likeBtnInput.attr("id", `icon-toggel-${i}`);
      //   likeBtnInput.attr("class", "mdl-switch__input");

      //   var likeIcon = $("<span>").attr("class", "mdl-switch__label");
      //   likeBtnLabel.append(likeBtnInput);
      //   likeBtnLabel.append(likeIcon);
      //   newRecipeLinkDiv.append(likeBtnLabel);

      //Append the Div in the newRecipeDiv
      newRecipeDiv.append(newTitleDiv);
      newRecipeDiv.append(newSummaryDiv);
      newRecipeDiv.append(newRecipeLinkDiv);
      //Append div in recipe body

      $("#recipes-body").append(newRecipeDiv);

      //   $(".like-button").on("click", function() {
      //     var clickedRecipeId = $(this).attr("id");
      //     console.log(`Button clicked is ${clickedRecipeId}`);
      //     if ($(this).attr("state") === "like") {
      //       $(this).text("UNLIKE");
      //       $(this).attr("state", "unlike");
      //       var updatedRecipes = [
      //         ...currentUser.recipes,
      //         parseInt(clickedRecipeId)
      //       ];
      //       userRef.update({
      //         recipes: updatedRecipes
      //       });
      //     } else if ($(this).attr("state") === "unlike") {
      //       $(this).text("LIKE");
      //       $(this).attr("state", "like");
      //       var updatedRecipes = currentUser.recipes.filter(function(
      //         savedRecipeId
      //       ) {
      //         return savedRecipeId !== parseInt(clickedRecipeId);
      //       });
      //       console.log(
      //         "[DEBUg] like/unlike handler :: removing recipe from favorites ::",
      //         currentUser.recipes,
      //         updatedRecipes
      //       );
      //       userRef.update({
      //         recipes: updatedRecipes
      //       });
      // }
      //   });
    }
  });
});

// console.log("[DEBUG] js loaded");

// const recipeSearchBtn = document.querySelector("#recipe-search-btn");

// recipeSearchBtn.addEventListener("click", function(event) {
//   event.preventDefault();

//   var cuisineSelectInput = document.querySelector("#cuisineSelect");
//   var i = cuisineSelectInput.selectedIndex;
//   var selectedCuisine = cuisineSelectInput.options[i].text;

//   console.log(selectedCuisine);

//   // search in spoonacular API and print on html
//   const spoonacularKey = "0d9362f34041402b8ec15c03ed3dead9";
//   var queryURL = `https://api.spoonacular.com/recipes/search?cuisine=${selectedCuisine}&number=5&apiKey=${spoonacularKey}`;
//   $.ajax({
//     type: "GET",
//     url: queryURL
//   }).then(function(response) {
//     var results = response.results;
//     console.log(results);
//     for (var i = 0; i < results.length; i++) {
//       console.log("[DEBUG] rendering search result ::", results[i]);
//       var recipeId = results[i].id;
//       var recipeTitle = results[i].title;
//       var img = `<img class="resultImg" src="https://spoonacular.com/recipeImages/${response.results[i].image}">`;
//       var baseURL = "https://spoonacular.com/recipeImages/";
//       var recipeImgURL = baseURL + response.results[i].image;
//       var recipeImg = $("<img>");
//       recipeImg.attr("src", recipeImgURL);
//       recipeImg.attr("class", "resultImg");
//       var likeUnlike =
//         currentUser.recipes.indexOf(recipeId) === -1 ? "like" : "unlike";
//       var likeButton = `<button id=${recipeId} type="button" class="like-button" state="${likeUnlike}">${likeUnlike.toUpperCase()}</button>`;
//       var recipeServing = results[i].servings;
//       var recipeTime = results[i].readyInMinutes;
//       var recipeArr = [img, recipeTitle, recipeServing, recipeTime, likeButton];
//       var newRow = $("<tr>");
//       recipeArr.forEach(function(detail) {
//         var column = document.createElement("td");
//         column.innerHTML = detail;
//         newRow.append(column);
//       });
//       $("tbody").append(newRow);

//       console.log("Recipe ID is" + recipeId);
//       var recipeURL =
//         `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=` +
//         spoonacularKey;
//       $.ajax({
//         type: "GET",
//         url: recipeURL
//       }).then(function(response) {
//         console.log(response);
//         var allIngrdts = response.extendedIngredients;
//         console.log(allIngrdts);
//         for (var i = 0; i < allIngrdts.length; i++) {
//           var ingredient = $("<h3>").text(allIngrdts[i].originalString);
//           $(".ingredients").append(ingredient);
//         }
//       });
//       console.log(recipeArr);
//       // get ingredients
//     }
//     $(".like-button").on("click", function() {
//       var clickedRecipeId = $(this).attr("id");
//       console.log(`Button clicked is ${clickedRecipeId}`);
//       if ($(this).attr("state") === "like") {
//         $(this).text("UNLIKE");
//         $(this).attr("state", "unlike");
//         var updatedRecipes = [
//           ...currentUser.recipes,
//           parseInt(clickedRecipeId)
//         ];
//         userRef.update({
//           recipes: updatedRecipes
//         });
//       } else if ($(this).attr("state") === "unlike") {
//         $(this).text("LIKE");
//         $(this).attr("state", "like");
//         var updatedRecipes = currentUser.recipes.filter(function(
//           savedRecipeId
//         ) {
//           return savedRecipeId !== parseInt(clickedRecipeId);
//         });
//         console.log(
//           "[DEBUg] like/unlike handler :: removing recipe from favorites ::",
//           currentUser.recipes,
//           updatedRecipes
//         );
//         userRef.update({
//           recipes: updatedRecipes
//         });
//       }
//     });

// // const qs = selector => document.querySelector(selector);
// // references to our count elements
// // const saved = qs(".saveButton");
// // const text = qs(".idRecipe");

// // initialize state
// //    var count = "262825";
// // update UI and state on button click
// //  saved.addEventListener("click", () => {
// //   });
// // });

// var firebaseConfig = {
//   apiKey: "AIzaSyBf1Ulnb618Uos69ZB7Ti0mZ6tUev842xk",
//   authDomain: "project-one-b8f55.firebaseapp.com",
//   databaseURL: "https://project-one-b8f55.firebaseio.com",
//   projectId: "project-one-b8f55",
//   storageBucket: "project-one-b8f55.appspot.com",
//   messagingSenderId: "558983366534",
//   appId: "1:558983366534:web:a71ad15fe65c9ac9964e07"
// };

// firebase.initializeApp(firebaseConfig);
// var db = firebase.firestore();
// const userRef = db.collection("users").doc("LCaIJje6quQOd5NOc9Cw");
// userRef.onSnapshot(doc => {
//   if (doc.exists) {
//     var userData = doc.data();
//     console.log("[DEBUG] user LCaIJje6quQOd5NOc9Cw updated ::", userData);
//     currentUser = {
//       id: "LCaIJje6quQOd5NOc9Cw",
//       ...userData
//     };
//   } else {
//     console.warn("[WARNING] user LCaIJje6quQOd5NOc9Cw does not exist");
//   }
// });
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
