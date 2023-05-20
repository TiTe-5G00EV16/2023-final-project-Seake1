const config = {
  //setting configs for DB (mongodb and cloudinary)
  PORT: process.env.PORT || 10000,
  DB_CONNECTION:
    "mongodb+srv://admin:Oliphant190@marketplacelopputyo.yredlb6.mongodb.net/?retryWrites=true&w=majority",
  SECRET: "badumts",
  COOKIE_NAME: "USER_SESSION",
  CLOUDINARY_NAME: "dw4cemovd",
  CLOUDINARY_API_KEY: "563121898426923",
  CLOUDINARY_API_SECRET: "kEKeXWrK45QO1v3AB2yAzi2Q2C4",
  CLOUDINARY_STORAGE: "pza5zln6",
};

module.exports = config;
