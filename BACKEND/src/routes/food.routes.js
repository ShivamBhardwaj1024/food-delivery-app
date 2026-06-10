const express = require(`express`);
const foodController = require(`../controllers/food.controller`);
const authMiddleware = require(`../middleware/auth.middleware`);
const routes = express.Router();

const multer = require(`multer`); // for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
});

// POST - /api/food/ - create a new food item  || **[protected]** by the use of authfoodpartnerMiddleware
// upload.single('video') - for handling single file upload with the field name `video`.
routes.post(
  `/`,
  authMiddleware.authfoodpartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

routes.get(
  `/`,
  authMiddleware.authUserMiddleware,
  foodController.getAllFoodItems,
);

module.exports = routes;
