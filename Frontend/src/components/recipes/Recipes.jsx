import React, { useState,useEffect } from "react";
import { Header } from "../common/Header";
import "../styles/recipes.css";
import "../styles/specialRecipes.css";



export const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("nolimit");
  const [difficultyLevel, setDifficultyLevel] = useState("all"); // Initialize with a default value
  const [cuisineType, setCuisineType] = useState("all"); // Initialize with a default value
  const [recipeModal, setRecipeModal] = useState([]); // Intialize Popup recipe detail
  const [noResults, setNoResults] = useState(false); // Define noResults state


  function getRecipeList() {
    fetch(`http://localhost:8080/api/recipes?recIngredients=${searchQuery}&recTimeFilter=${filterQuery}&recDifficulty=${difficultyLevel}&recCuisineType=${cuisineType}`
 )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecipeList(data);
        setNoResults(data.length === 0); // when length is 0 set it noresults.
      });
  }
  useEffect(() => {
    // This will run whenever filterQuery, difficultyLevel, or cuisineType changes
    getRecipeList();
  }, [filterQuery, difficultyLevel, cuisineType]);


  function showModal(e) {
    e.preventDefault();

    const mealItem = e.target.closest('[data-recid]');
  
  if (mealItem) {
    // Access the 'data-recid' attribute value using 'dataset'
    const recID = mealItem.dataset.recid;

    // Now you have the recID, you can proceed with fetching and displaying data
    fetch(`http://localhost:8080/api/recipes/${recID}`)
      .then((response) => response.json())
      .then((data) => setRecipeModal(data));

    const mealDetailsContent = document.querySelector('.meal-details-content');
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
  }

function hideModal() {
  const mealDetailsContent = document.querySelector('.meal-details-content');
  mealDetailsContent.parentElement.classList.remove('showRecipe');
  setRecipeModal([])
}

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      getRecipeList();
    }
  }

  return (
    <>
      <header className="header">
        <Header />
        <div className="container">
          <div className="meal-wrapper">
            <div className="meal-search">
              <h2 className="title">Pop in your ingredients and find a tasty meal!</h2>
              <blockquote>
                Real food doesn't have ingredients = real food is ingredients.
                <br />
              </blockquote>

              <div className="meal-search-box">
                <div className="input-box">
                  <i className="uil uil-search"></i>
                  <input
                    type="text"
                    className="searchRecipe"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onKeyDown={handleKeyPress} // Add this line to handle key press
                  />
                  <button className="button" onClick={getRecipeList}>
                    Search
                  </button>
                </div>
              </div>
            </div>
           <div className="filter-container">
              <div className="filter">
                <label htmlFor="select time">Cooking Time:</label>

                &nbsp;&nbsp;
                <div className="select-container">
                <select 
                        name="cooking time"
                        id="cooking time"
                        value={filterQuery}
                        onChange={(event) => setFilterQuery(event.target.value)} >
                  <option value="nolimit">No limit</option>
                  <option value="1">Less Than 15Mins</option>
                  <option value="2">15Mins - 30Mins</option>
                  <option value="3">30Mins - 60Mins</option>
                  <option value="4">Over 1Hr</option>
                </select>
                </div>
              </div>

              <div className="filter">
                <label htmlFor="select-difficulty">Difficulty Level:</label>
                &nbsp;&nbsp;
                <div className="select-container">
                <select
                  name="difficulty"
                  id="select-difficulty"
                  value={difficultyLevel}
                  onChange={(event) => setDifficultyLevel(event.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                </div>
              </div>

             <div className="filter">
              <label htmlFor="select-cuisine">Cuisine Type:</label>
              &nbsp;&nbsp;
              <div className="select-container">
              <select
                name="cuisine"
                id="select-cuisine"
                value={cuisineType}
                onChange={(event) => setCuisineType(event.target.value)}
              >
                <option value="all">All Cuisines</option>
                <option value="African Cuisine">African Cuisine</option>
                <option value="Asian Cuisine">Asian Cuisine</option>
                <option value="European Cuisine">European Cuisine</option>
                <option value="North American Cuisine">North American Cuisine</option>
                <option value="South American Cuisine">South American Cuisine</option>
                <option value="Australian and Oceanian Cuisine">Australian and Oceanian Cuisine</option>
                <option value="Other">Other Cuisine</option>
              </select>
              </div>
              </div>
            </div>

            
           <div className="meal-result">
              {noResults ? (
                <p>No available results found.</p>
              ) : (
                <>
              <h2 className="title">Your Search Results:</h2>

              <div id="meal">
                {recipeList.map(meal => (
                  <div className="meal-item" data-recid={meal.recID}>
                    <div >
                      <div class="image"><img src={meal.recImageUrl} alt=""/></div>
                      <div class="rating">
                          <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                          <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                          <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                          <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                          <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                      </div>
                      <h4>{meal.recName}</h4>
                      <div class="price">
                          <span>Price: </span><span class="color">${20}</span>
                      </div>
                      <div onClick = {(e) => showModal(e)} class="button btn" style={{marginTop: "20px", marginBottom: "20px"}}>View Recipe</div>
                    </div>
                  </div>
                ))}
              </div>
              </>
            )}
            </div>

            <div className = {"meal-wrapper"}>
                <div class = "meal-details">
                    <button type = "button" class = "btn recipe-close-btn" id = "recipe-close-btn" onClick={() => hideModal()}>x</button>
                    <div class = "meal-details-content">
                        <h2 class = "recipe-title">{recipeModal.recName}</h2>
                        <div class = "recipe-meal-img" style={{marginBottom: "2.5em"}}>
                            <img src ={recipeModal.recImageUrl} alt = ""/>
                        </div>
                        <p>
                          <strong>Level:</strong> {recipeModal.recDifficulty}
                        </p>
                        <p>
                          <strong>Time:</strong> {recipeModal.recTimeString}
                        </p>
                        <p>
                          <strong>Cuisine Type:</strong> {recipeModal.recCountry}
                        </p>
                        <p>
                          <strong>Ingredients:</strong>
                        </p>
                        <ul>
                          {recipeModal.recIngredients && recipeModal.recIngredients.split("\n").map((ingredient, i) => (
                            <li key={i}>{ingredient.trim()}</li>
                          ))}
                        </ul>
                        <div class = "recipe-instruct">
                          <p>
                            <strong>Instructions:</strong> {recipeModal.recInstructions}
                          </p>
                        </div>
                        
                     </div>
                  </div>
             </div>
             
              
            
          </div>
        </div>
      </header>
    </>
    
  );
};
