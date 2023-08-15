import React, { useState } from "react";
import { Header } from "../common/Header";
import "../styles/recipes.css";
import "../styles/specialRecipes.css";

export const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function getRecipeList() {
    fetch(`http://localhost:8080/api/recipes?recIngredients=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {//???
        console.log(data);
        setRecipeList(data);//???
      });
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
                    <h3>{meal.recName}</h3>
                    <img src={meal.recImageUrl}></img>
                    <p>
                      <strong>Time:</strong> {meal.recTime}
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
