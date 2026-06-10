// const userModel = require(`../models/user.model`);
// const foodpartnerModel = require(`../models/foodpartner.model`);
const bcrypt = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);
const authDAO = require(`../data access object(DAO)/auth.dao`);
const validation = require(`../validations/auth.validation`);

async function registerUser(req, res) {
  const error = await validation.registerUserValidation(req.body);

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  if (error) {
    return res.status(400).json({
      message: error,
    });
  }

  // const isUserExist = await userModel.findOne({
  //     email
  // })

  const isUserExist = await authDAO.isUserExistDAO(req.body.email);

  if (isUserExist) {
    return res.status(400).json({
      message: `User already exist`,
    });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newUser = await authDAO.registerUserDAO({
    fullName,
    email,
    password: hashedpassword,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: `User registered sucessfully`,
    id: newUser._id,
    user: newUser.fullName,
    email: newUser.email,
  });
}

async function loginUser(req, res) {
  const error = await validation.loginUserValidation(req.body);

  if (error) {
    return res.status(400).json({
      message: error,
    });
  }

  // const {email , password} = req.body;

  // if( !email || !password ) {
  //     return res.status(400).json({
  //         message: `All fields required`
  //     })
  // }

  // const user = await userModel.findOne({
  //     email
  // })

  const user = await authDAO.isUserExistDAO(req.body.email);

  if (!user) {
    return res.status(400).json({
      message: `user not found`,
    });
  }

  // const isPasswordMatch = await bcrypt.compare(password , user.password);
  const ispasswordMatch = await authDAO.isUserPasswordMatchDAO(
    req.body.password,
    user,
  );

  if (!ispasswordMatch) {
    return res.status(400).json({
      message: `Invalid Credential`,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: `User logged in successfully`,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: `User logged out successfully`,
  });
}

async function foodpartnerRegister(req, res) {
  console.log("BODY:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: `All fields required`,
    });
  }

  const isFoodpartnerExist = await foodpartnerModel.findOne({
    email,
  });

  if (isFoodpartnerExist) {
    return res.status(400).json({
      message: `Food Partner already exist`,
    });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const newFoodpartner = await authDAO.foodpartnerRegisterDAO({
    name,
    email,
    password: hashedpassword,
  });

  const token = jwt.sign(
    {
      id: newFoodpartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food partner registration successfully",

    newFoodpartner: {
      id: newFoodpartner._id,
      name: newFoodpartner.name,
      email: newFoodpartner.email,
    },
  });
}

async function foodpartnerLogin(req, res) {
  // const {email , password} = req.body;
  const error = await validation.foodpartnerLoginValidation(req.body);

  if (error) {
    return res.status(400).json({
      message: error,
    });
  }

  // if(!email || !password) {
  //     res.status(400).json({
  //         message: `All fields required`
  //     })
  // }

  // const foodpartner = await foodpartnerModel.findOne({
  //     email
  // })
  const foodpartnerExistance = await authDAO.isFoodPartnerExistDAO(
    req.body.email,
  );

  if (!foodpartnerExistance) {
    return res.status(400).json({
      message: `Food partner not found`,
    });
  }

  // if(!foodpartner) {
  //     return res.status(400).json({
  //         message : `Food partner not found`
  //     })
  // }

  // const ismatchpassword = await bcrypt.compare(password , foodpartnerExistance.password);
  const ismatchedpassword = await authDAO.isFoodPartnerPasswordMatchDAO(
    req.body.password,
    foodpartnerExistance,
  );

  if (!ismatchedpassword) {
    return res.status(400).json({
      message: `Invalid password`,
    });
  }

  const token = jwt.sign(
    {
      id: foodpartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(200).json({
    message: `Food partner loogged in successfully`,
    foodpartner: {
      id: foodpartner._id,
      name: foodpartner.name,
      email: foodpartner.email,
    },
  });
}

async function foodpartnerLogout(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: `Food partner logged out successfully`,
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  foodpartnerRegister,
  foodpartnerLogin,
  foodpartnerLogout,
};
