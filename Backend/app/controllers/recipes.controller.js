const db = require("../models");
const Recipes = db.recipes;
const Op = db.Sequelize.Op;

exports.health = (req, res) => {
  res.status(200).send({
    message: "Service is Up!"
  });
};

// Create and Save a new Recipe
exports.create = (req, res) => {

  // Create a Recipe
  const newRecipe = {
    recID: req.body.recID,
    recName: req.body.recName,
    recImageUrl: req.body.recImageUrl,
    recTime: req.body.recTime,
    recTimeString: req.body.recTimeString,
    recIngredients: req.body.recIngredients,
    recInstructions: req.body.recInstructions,
    recCuisineType: req.body.recCuisineType,
    recCountry: req.body.recCountry,
    recDifficulty: req.body.recDifficulty,


    //recLevel: req.body.recLevel
  };

  // Save Recipe in the database
  Recipes.create(newRecipe)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error Occurred"
      });
    });
};


// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
  const recIngredients = req.query.recIngredients;
  const timeRange = req.query.recTimeFilter;
  const difficultyLevel = req.query.recDifficulty;
  const cuisineType = req.query.recCuisineType;

  let temp = null;

  // Handle time range conditions as you were doing before
  if (timeRange === "1") {
    temp = { recTime: { [Op.lt]: 15 } };
  } else if (timeRange === "2") {
    temp = { recTime: { [Op.between]: [15, 30] } };
  } else if (timeRange === "3") {
    temp = { recTime: { [Op.between]: [30, 60] } };
  } else if (timeRange === "4") {
    temp = { recTime: { [Op.gt]: 60 } };
  }

  // Create separate condition objects for difficulty level and cuisine type
  const condition = { ...temp }; // Start with the time conditions

  if (difficultyLevel !== 'all') {
    condition.recDifficulty = difficultyLevel;
  }

  if (cuisineType !== 'all') {
    condition.recCuisineType = cuisineType;
  }

  if (recIngredients) {
    // Split the recIngredients string into an array
    const ingredientsArray = recIngredients.split(',').map(ingredient => ingredient.trim());
  
    // Create an array of conditions for each ingredient using [Op.like]
    const ingredientConditions = ingredientsArray.map(ingredient => ({
      recIngredients: { [Op.like]: `%${ingredient}%` },
    }));
  
    // Combine ingredient conditions with [Op.and] to match recipes containing all specified ingredients
    condition[Op.and] = ingredientConditions;
  }

  // Construct the final where condition
  const whereCondition = {
    [Op.and]: [
      condition, // Add time, difficulty, and cuisine conditions here
    ],
  };

  Recipes.findAll({ where: whereCondition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error Occurred"
      });
    });
};



// /*Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Recipes.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Recipe with id=" + id
      });
    });
};

//  Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   const recID = req.params.id;

//   Tutorial.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Recipe was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id
//       });
//     });
// };*/

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const recID = req.params.recID;

  Recipes.destroy({
    where: { recID: recID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Recipe with id=${recID}. Maybe recipe was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete recipe with id=" + recID
      });
    });
};




/* Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};*/
