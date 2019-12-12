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
    // response headers: {
    //   "Content-Type": "application/json"
    // }???
  }).then(function(response) {
    console.log(response);
    recipeId = response.results[0].id;
    console.log(recipeId);
    var baseURL = "https://spoonacular.com/recipeImages/";
    var imgURL = baseURL + response.results[0].image;
    // var dishImg = $("<img>").attr("src", imgURL);
    // $(".images").append(dishImg);
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
  });
});
