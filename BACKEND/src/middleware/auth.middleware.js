const foodpartnerModel = require(`../models/foodpartner.model`);
const jwt = require(`jsonwebtoken`);
const userModel = require("../models/user.model");


// token verification for foodpartner
async function authfoodpartnerMiddleware(req,res,next) {

    const token = req.cookies.token;

    if(!token) {

        return res.status(401).json({
            message: `unauthorized access - token missing`
        })
        
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const foodpartner = await foodpartnerModel.findById(decoded.id);

        req.foodpartner = foodpartner;
        next();

    }
    catch(err) {

        return res.status(401).json({
            message: `unauthorized access - invalid token`
        })

    }

}

async function authUserMiddleware(req,res,next) {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: `unauthorised access - Token missing `
        })
    }

    try {

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;

        next();

    } catch(error) {

        return res.status(401).json({
            message: `Invalid Token`
        })

    }

}

module.exports = {
    authfoodpartnerMiddleware,
    authUserMiddleware,
}