const mongoose = require("mongoose");
const { DB_CONNECTION } = require("./config");
//DB connections.
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
//setting up error message if Database connection has error.
db.on("error", console.error.bind(console, "DB connection error:"));
module.exports = db;
