require("dotenv").config();
const config = require("./config");
const cloudinary = require("cloudinary");
//Setting up config to catch cloudinary configs.
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary };
