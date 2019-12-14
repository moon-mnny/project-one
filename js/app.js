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
    console.log(response);
    recipeId = response.results[0].id;
    console.log(recipeId);
    var dishTitle = $("<td>").text(response.results[0].title);
    $("<tr>").append(dishTitle);
    var prepareMinutes = $("<h3>").text(
      `Ready in ${response.results[0].readyInMinutes} minutes`
    );
    $(".info").append(prepareMinutes);
    var totalServings = $("<h3>").text(
      `Servings: ${response.results[0].servings}`
    );
    $(".info").append(totalServings);
    // get ingredients
    var recipeURL =
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=` +
      spoonacularKey;
    $.ajax({
      type: "GET",
      url: recipeURL
    }).then(function(response) {
      console.log(response);
      var allIngrdts = response.extendedIngredients;
      console.log(allIngrdts);
      for (var i = 0; i < allIngrdts.length; i++) {
        var ingredient = $("<h3>").text(allIngrdts[i].originalString);
        $(".ingredients").append(ingredient);

        if (response.results=true){
          console.log('DEBUG')
          var buttom = document.createElement('div')
          buttom.innerHTML='<buttom>Save</buttom>';
          document.body.appendChild(buttom);
          
        }
      }
    });
  });
});
