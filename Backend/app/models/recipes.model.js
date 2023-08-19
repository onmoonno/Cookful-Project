module.exports = (sequelize, Sequelize) => {
  const Recipes = sequelize.define("recipes", {
    recID: {
      type: Sequelize.STRING
    },
    recName: {
      type: Sequelize.STRING
    },
    recImageUrl: {
      type: Sequelize.STRING
    },
    recTime: {
      type: Sequelize.FLOAT
    },
    recTimeString: {
      type: Sequelize.STRING
    },
    recIngredients: {
      type: Sequelize.TEXT     /*ARRAY(Sequelize.TEXT)*/
    },
    recInstructions: {
      type: Sequelize.TEXT
    },
    recCuisineType: {
      type: Sequelize.TEXT
    },
    recCountry: {
      type: Sequelize.TEXT
    },
    recDifficulty: {
      type: Sequelize.TEXT
    },

  });

  
  return Recipes;
};
