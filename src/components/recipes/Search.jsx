import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [ingredients, setIngredients] = useState('');

  const handleInputChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleSearch = () => {
    onSearch(ingredients);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ingredients..."
        value={ingredients}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
