import React, { useState } from "react";
import { Header } from "../common/Header";
import "../styles/recipes.css";
import "../styles/specialRecipes.css";

export const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function getRecipeList() {
    fetch(`http://localhost:3000/recipes/?ingredients=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipeList(data);
      });
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getRecipeList();
    }
  };

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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress} // Add the event listener
                  />
                  <button className="button" onClick={getRecipeList}>
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="meal-result">
              <h2 className="title">Your Search Results:</h2>
              <div id="meal">
                {recipeList.map((meal, index) => (
                  <div className="meal-item" key={index}>
                    <h3>{meal.Receipe}</h3>
                    <p>
                      <strong>Time:</strong> {meal.Time}
                    </p>
                    <p>
                      <strong>Ingredients:</strong>
                    </p>
                    <ul>
                      {meal.Ingredients.split("\n").map((ingredient, i) => (
                        <li key={i}>{ingredient.trim()}</li>
                      ))}
                    </ul>
                    <p>
                      <strong>Instructions:</strong> {meal.Instructions}
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
