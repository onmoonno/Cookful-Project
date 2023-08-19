import React, { useState } from "react";
import { Header } from "../common/Header";
import "../styles/recipes.css";
import "../styles/specialRecipes.css";

export const Recipes = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("1");

  function getRecipeList() {
    fetch(`http://localhost:8080/api/recipes?recIngredients=${searchQuery}&recTimeFilter=${filterQuery}`)
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
           
            <label htmlFor="select time">Select Your Cooking Time:</label>

            &nbsp;&nbsp;
            <select name="cooking time" 
                    id="cooking time"
                    value={filterQuery}
                    onChange={(event) => setFilterQuery(event.target.value)} >
              <option value="1">Less Than 15Mins</option>
              <option value="2">15Mins - 30Mins</option>
              <option value="3">30Mins - 60Mins</option>
              <option value="4">Over 1Hr</option>
            </select>
            
            
            
            
            
          


            <div className="meal-result">
              <h2 className="title">Your Search Results:</h2>
              <div id="meal">
                {recipeList.map((meal, index) => (
                  <div className="meal-item" key={index}>
                    <h3>{meal.recName}</h3>
                    <img src={meal.recImageUrl} alt="Recipe Image"></img>
                    <p>
                      <strong>Level:</strong> {meal.recLevel}
                    </p>
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
