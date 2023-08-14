require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors({}));

app.use(express.json());

app.use(require("./routes"));
//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// Sync database
sequelize.sync({ alter: true });

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
