const foodModel = require(`../models/food.model`);

async function createFoodDAO(data) {
  return await foodModel.create(data);
}

module.exports = {
  createFoodDAO,
};
