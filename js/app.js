console.log("hello");
const recipeSearchBtn = document.querySelector("#recipe-search-btn");

recipeSearchBtn.addEventListener("click", function(event) {
  event.preventDefault();

  var cuisineSelectInput = document.querySelector("#cuisineSelect");
  var i = cuisineSelectInput.selectedIndex;
  var selectedCuisine = cuisineSelectInput.options[i].text;

  console.log(selectedCuisine);
});
