const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/config");

async function registerUser(userData) {
  let { name, email, password, repeatPassword } = userData;
  let errors = [];
  let checkUser = await User.findOne({ email });
  if (checkUser) errors.push("Email address is already in use; ");
  if (name.length < 3 || name.length > 50)
    errors.push(
      "Name needs be at least 3 characters long and max 50 characters long; "
    );
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false)
    errors.push("Please fill a valid email address; ");
  if (password !== repeatPassword) errors.push("Passwords needs match; ");
  if (password.length < 8)
    errors.push("Password needs be at least 8 characters long; ");
  if (password.length > 15)
    errors.push("Password needs be at max 15 characters long; ");
  if (errors.length >= 1) throw { message: [errors] };

  let user = new User(userData);
  return await user.save();
}

async function getUser(id) {
  return await User.findById(id).lean();
}

async function loginUser({ email, password }) {
  let user = await User.findOne({ email });
  if (!user) throw { message: "Invalid email or password" };

  let hasValidPass = await bcrypt.compare(password, user.password);
  if (!hasValidPass) throw { message: "Invalid email or password" };

  let token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      createdSells: user.createdSells.length,
      avatar: user.avatar,
    },
    SECRET
  );
  return token;
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
