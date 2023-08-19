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
  /* Validate request
  if (!req.body.recName) {
    res.status(400).send({
      message: "No recipe found!"
    });
    return;
  }*/

  // Create a Recipe
  const newRecipe = {
    recID: req.body.recID,
    recName: req.body.recName,
    recImageUrl: req.body.recImageUrl,
    recTime: req.body.recTime,
    recIngredients: req.body.recIngredients,
    recInstructions: req.body.recInstructions,
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
  let temp=null;
  if (timeRange === "1") {
    temp = { recTime: {[Op.lt]: 15 } };
  } else if (timeRange === "2") {
    temp = { recTime: { [Op.between]: [15, 30] } };
  } else if (timeRange === "3") {
    temp = { recTime: { [Op.between]: [30, 60] } };
  } else if (timeRange === "4") {
    temp = { recTime: { [Op.gt]: 60 } };
  }
  let condition = null;
  if (recIngredients) {
    const ingredientList = recIngredients.split(',');
    condition = {
      [Op.and]: [
        ingredientList.map(recIngredient => ({
        recIngredients: { [Op.iLike]: `%${recIngredient}%`} })),
        temp
      ]
    };
  }


  Recipes.findAll({ where: condition })
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
  




  /*exports.filterAll = (req, res) => {
    const recTime = req.query.recTime;
    let condition = null;
    if (recTime) {
      const timeNo = recTime.split(',')[0]//.map(value => parseInt(value,10));
      const timeRange = timeNo.map(value => {
        if (value === 1) {
          return { recTime: {[Op.lt]: 15 } };
        } else if (value === 2) {
          return { recTime: { [Op.between]: [15, 30] } };
        } else if (value === 3) {
          return { recTime: { [Op.between]: [30, 60] } };
        } else if (value === 4) {
          return { recTime: { [Op.gt]: 1 } };
        }
      });
      condition = {
        [Op.or]: timeRange
      };
    }
     
  Recipes.filterAll({ where: condition })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error Occurred"
    });
  });
};*/
  
  








  





/*Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const recID = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Recipe was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};*/

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
