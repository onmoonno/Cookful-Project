module.exports = (sequelize, Sequelize) => {
  const Recipes = sequelize.define("recipes", {
    recID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true, // This makes the recID auto-increment
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
    recPhotoID: {
      type: Sequelize.INTEGER,
    },
  });

  
  return Recipes;
};
