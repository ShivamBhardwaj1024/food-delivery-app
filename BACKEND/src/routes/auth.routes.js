const express = require(`express`);
const authController = require("../controllers/auth.controller");
const authMiddleware = require(`../middleware/auth.middleware`);

const routes = express.Router();

// user API routes
routes.post(`/user/register`, authController.registerUser);
routes.post(`/user/login`, authController.loginUser);
routes.post("/user/logout", authController.logoutUser);

// food partner API routes
routes.post(`/foodpartner/register`, authController.foodpartnerRegister);
routes.post(`/foodpartner/login`, authController.foodpartnerLogin);
routes.post(`/foodpartner/logout`, authController.foodpartnerLogout);

// user details route
routes.get(`/me`, authMiddleware.authUserMiddleware, authController.getUserDetails);


module.exports = routes;
