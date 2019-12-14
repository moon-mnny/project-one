console.log("[DEBUG] js loaded");

var currentUser = {};

const recipeSearchBtn = document.querySelector("#recipe-search-btn");

recipeSearchBtn.addEventListener("click", function(event) {
  event.preventDefault();

  var cuisineSelectInput = document.querySelector("#cuisineSelect");
  var i = cuisineSelectInput.selectedIndex;
  var selectedCuisine = cuisineSelectInput.options[i].text;

  console.log(selectedCuisine);

  // search in spoonacular API and print on html
  const spoonacularKey = "c3d4ddbeedc2444a984cddbbc42db308";
  var queryURL = `https://api.spoonacular.com/recipes/search?cuisine=${selectedCuisine}&number=5&apiKey=${spoonacularKey}`;
  $.ajax({
    type: "GET",
    url: queryURL
  }).then(function(response) {
    var results = response.results;
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      console.log('[DEBUG] rendering search result ::', results[i])
      var recipeId = results[i].id;
      var recipeTitle = results[i].title;
      var img = `<img class="resultImg" src="https://spoonacular.com/recipeImages/${response.results[i].image}">`;
      //   var baseURL = "https://spoonacular.com/recipeImages/";
      //   var recipeImgURL = baseURL + response.results[i].image;
      //   var recipeImg = $("<img>");
      //   recipeImg.attr("src", recipeImgURL);
      //   recipeImg.attr("class", "resultImg");
      var likeUnlike = currentUser.recipes.indexOf(recipeId) === -1 ? "like" : "unlike";
      var likeButton = `<button id=${recipeId} type="button" class="like-button" state="${likeUnlike}">${likeUnlike.toUpperCase()}</button>`;
      var recipeServing = results[i].servings;
      var recipeTime = results[i].readyInMinutes;
      var recipeArr = [img, recipeTitle, recipeServing, recipeTime, likeButton];
      var newRow = $("<tr>");
      recipeArr.forEach(function(detail) {
        var column = document.createElement("td");
        column.innerHTML = detail;
        newRow.append(column);
      });
      $("tbody").append(newRow);

      console.log("Recipe ID is" + recipeId);
      //   var recipeURL =
      //     `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=` +
      //     spoonacularKey;
      //   $.ajax({
      //     type: "GET",
      //     url: recipeURL
      //   }).then(function(response) {
      //     console.log(response);
      //     var allIngrdts = response.extendedIngredients;
      //     console.log(allIngrdts);
      //     for (var i = 0; i < allIngrdts.length; i++) {
      //       var ingredient = $("<h3>").text(allIngrdts[i].originalString);
      //       $(".ingredients").append(ingredient);
      //     }
      //   });
      console.log(recipeArr);
      // get ingredients
    }
    $(".like-button").on("click", function() {
      var clickedRecipeId = $(this).attr("id");
      console.log(`Button clicked is ${clickedRecipeId}`);
      if ($(this).attr("state") === "like") {
        $(this).text("UNLIKE");
        $(this).attr("state", "unlike");
        var updatedRecipes = [...currentUser.recipes, parseInt(clickedRecipeId)]
        userRef.update({
          recipes: updatedRecipes
        })
        
      } else if ($(this).attr("state") === "unlike") {
        $(this).text("LIKE");
        $(this).attr("state", "like");
        var updatedRecipes = currentUser.recipes.filter(function(savedRecipeId) {
          return savedRecipeId !== parseInt(clickedRecipeId);
        })
        console.log('[DEBUg] like/unlike handler :: removing recipe from favorites ::',  currentUser.recipes, updatedRecipes)
        userRef.update({
          recipes: updatedRecipes
        })
      }

      
    });

    
// const qs = selector => document.querySelector(selector);
// references to our count elements
// const saved = qs(".saveButton");
// const text = qs(".idRecipe");


       // initialize state
    //    var count = "262825";
       // update UI and state on button click
      //  saved.addEventListener("click", () => {
         
         


  });
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
