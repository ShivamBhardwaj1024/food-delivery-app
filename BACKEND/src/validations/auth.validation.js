async function registerUserValidation(data) {
  const { fullName, email, password } = data;

  if (!fullName || !email || !password) {
    return {
      status: false,
      message: `All fields required`,
    };
  }

  return null;
}

async function loginUserValidation(data) {
  const { email, password } = data;

  if (!email || !password) {
    return {
      status: false,
      message: `All fields required`,
    };
  }

  return null;
}

async function foodpartnerLoginValidation(data) {
  const { email, password } = data;

  if (!email || !password) {
    return {
      status: false,
      message: `All fields required`,
    };
  }

  return null;
}

module.exports = {
  registerUserValidation,
  loginUserValidation,
  foodpartnerLoginValidation,
};
