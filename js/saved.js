// Add list item for each recipe id saved to saved.html dom
var savedRecipesList = document.querySelector("#saved-recipes");

userRef.onSnapshot(doc => {
    if (doc.exists) {
      var userData = doc.data();
      userData.recipes.forEach(recipe => {
        var recipeItem = document.createElement("li");
        recipeItem.textContent = recipe;
        savedRecipesList.append(recipeItem)
      });
    } else {
      console.warn("[WARNING] user LCaIJje6quQOd5NOc9Cw does not exist");
    }
  });