// const foodModel = require(`../models/food.model`);
const Storage = require(`../services/storage.service`);
const { v4: uuid } = require(`uuid`);
const foodDAO = require(`../data access object(DAO)/food.dao`);
const foodModel = require("../models/food.model");

// create a new food item
async function createFood(req, res) {
  try {
    const { foodname, price, discription } = req.body;
    const fileUploadResult = await Storage.uploadFile(req.file.buffer, uuid());

    const newFood = await foodDAO.createFoodDAO({
      foodname,
      price,
      discription,
      video: fileUploadResult.url,
      foodpartner: req.foodpartner._id,
    });

    // const newFood = await foodModel.create({
    //     foodname: req.body.foodname,
    //     discription: req.body.discription,
    //     price: req.body.price,
    //     video: fileUploadResult.url,
    //     foodpartner: req.foodpartner._id,

    // })

    res.status(201).json({
      message: `Food item created successfully`,
      food: newFood,
    });

    // console.log(fileUploadResult);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: `Internal server error`,
    });
  }

  // const {foodname, video, price, discription} = req.body;

  // if(!foodname || !video || !price) {
  //     return res.status(400).json({
  //         message: `All fields required`
  //     })
  // }

  // const newFood = await foodModel.create({
  //     foodname,
  //     video,
  //     price,
  //     discription,
  //     foodpartner: req.foodpartner._id,
  // })

  // res.status(201).json({
  //     message: `Food item created successfully`,

  //     newFood: {
  //         foodname: newFood.foodname,
  //         video: newFood.video,
  //         price: newFood.price,
  //         discription: newFood.discription,
  //     }
  // })
}

async function getAllFoodItems(req, res) {
  const foodItems = await foodModel.find({});

  return res.status(200).json({
    messgae: ` Food items retrived successfully `,
    foodItems,
  });
}

module.exports = {
  createFood,
  getAllFoodItems,
};
