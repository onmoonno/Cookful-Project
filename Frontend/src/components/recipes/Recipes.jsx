import React, { useState } from "react";
import { Header } from "../common/Header";
import "../styles/recipes.css";
import "../styles/specialRecipes.css";

export const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("nolimit");
  const [difficultyLevel, setDifficultyLevel] = useState("all"); // Initialize with a default value
  const [cuisineType, setCuisineType] = useState("all"); // Initialize with a default value



  function getRecipeList() {
    fetch(`http://localhost:8080/api/recipes?recIngredients=${searchQuery}&recTimeFilter=${filterQuery}&recDifficulty=${difficultyLevel}&recCuisineType=${cuisineType}`
 )
      .then((response) => response.json())
      .then((data) => {//???
        console.log(data);
        setRecipeList(data);//???
      });
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
                    onKeyPress={handleKeyPress} // Add this line to handle key press
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
                <select name="cooking time"
                        id="cooking time"
                        value={filterQuery}
                        onChange={(event) => setFilterQuery(event.target.value)} >
                  <option value="1">Less Than 15Mins</option>
                  <option value="2">15Mins - 30Mins</option>
                  <option value="3">30Mins - 60Mins</option>
                  <option value="4">Over 1Hr</option>
                  <option value="nolimit">No limit</option>
                </select>
              </div>

              <div className="filter">
                <label htmlFor="select-difficulty">Difficulty Level:</label>
                &nbsp;&nbsp;
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

             <div className="filter">
              <label htmlFor="select-cuisine">Cuisine Type:</label>
              &nbsp;&nbsp;
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

            
            
            
          


            <div className="meal-result">
              <h2 className="title">Your Search Results:</h2>
              <div id="meal">
                {recipeList.map((meal, index) => (
                  <div className="meal-item" key={index}>
                    <h3>{meal.recName}</h3>
                    <img src={meal.recImageUrl} alt="Recipe Image"></img>
                    <p>
                      <strong>Level:</strong> {meal.recDifficulty}
                    </p>
                    <p>
                      <strong>Time:</strong> {meal.recTimeString}
                    </p>
                    <p>
                      <strong>Cuisine Type:</strong> {meal.recCountry}
                    </p>
                    <p>
                      <strong>Ingredients:</strong>
                    </p>
                    <ul>
                      {meal.recIngredients.split("\n").map((ingredient, i) => (
                        <li key={i}>{ingredient.trim()}</li>
                      ))}
                    </ul>
                    <p>
                      <strong>Instructions:</strong> {meal.recInstructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
