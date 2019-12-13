console.log("hello");
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
      var recipeId = results[i].id;
      var recipeTitle = results[i].title;
      var img = `<img class="resultImg" src="https://spoonacular.com/recipeImages/${response.results[i].image}">`;
      //   var baseURL = "https://spoonacular.com/recipeImages/";
      //   var recipeImgURL = baseURL + response.results[i].image;
      //   var recipeImg = $("<img>");
      //   recipeImg.attr("src", recipeImgURL);
      //   recipeImg.attr("class", "resultImg");
      var recipeServing = results[i].servings;
      var recipeTime = results[i].readyInMinutes;
      var recipeArr = [img, recipeTitle, recipeServing, recipeTime];
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
  });
});
