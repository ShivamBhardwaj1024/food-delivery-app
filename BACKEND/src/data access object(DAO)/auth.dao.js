const userModel = require(`../models/user.model`);
const foodpartnerModel = require(`../models/foodpartner.model`);
const bcrypt = require(`bcrypt`);

async function registerUserDAO(data) {
    return await userModel.create(data);
}

async function foodpartnerRegisterDAO(data) {
    return await foodpartnerModel.create(data);
}

async function isUserExistDAO(email) {
    return await userModel.findOne({ email });
}

async function isUserPasswordMatchDAO(password, user) {
    return await bcrypt.compare(password, user.password)
}

async function isFoodPartnerExistDAO(email) {
    return await foodpartnerModel.find({ email});
}

async function isFoodPartnerPasswordMatchDAO(password, foodpartnerExistance) {
    return await bcrypt.compare(password, foodpartnerExistance.password)
}


module.exports = {
    registerUserDAO,
    foodpartnerRegisterDAO,
    isUserExistDAO,
    isUserPasswordMatchDAO,
    isFoodPartnerExistDAO,
    isFoodPartnerPasswordMatchDAO,
}