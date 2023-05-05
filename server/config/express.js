const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
//Setting localhost server.
module.exports = (app) => {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json({ limit: "150mb" }));
  app.use(express.urlencoded({ limit: "150mb", extended: true }));
  app.use(cookieParser());
};
