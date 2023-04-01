const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const stationRouter = require("./routes/station");
const trainRouter = require("./routes/tarain");

const app = express();

// routes & middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/station", stationRouter);
app.use("/api/train", trainRouter);

//DB setup
const connectDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Error connecting to mongodb", err));
};
connectDatabase();
//server setup
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Server running at port ${port}`));
