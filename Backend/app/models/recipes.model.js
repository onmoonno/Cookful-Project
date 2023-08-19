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
    recIngredients: {
      type: Sequelize.TEXT     /*ARRAY(Sequelize.TEXT)*/
    },
    recInstructions: {
      type: Sequelize.TEXT
    }

  });

  
  return Recipes;
};
