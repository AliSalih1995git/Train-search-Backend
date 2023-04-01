const data = require("../data");
const Station = require("../models/station");

const router = require("express").Router();

router.post("/", async (req, res) => {
  await Station.deleteMany({});
  const createdStations = await Station.insertMany(data.station);
  res.send({ createdStations });
});
router.get("/getAllstation", async (req, res) => {
  try {
    const getStaions = await Station.find({});
    res.status(200).json(getStaions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
