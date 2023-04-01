const data = require("../data");
const Train = require("../models/train");

const router = require("express").Router();

//save all trainDatas
router.post("/", async (req, res) => {
  await Train.deleteMany({});
  const createdTrains = await Train.insertMany(data.train);
  res.send({ createdTrains });
});

//get trainData besed on source,destination
router.get("/:source/:destination", async (req, res) => {
  const source = req.params.source;
  const destination = req.params.destination;
  try {
    const trains = await Train.find({ source, destination });
    if (trains.length === 0) {
      res.status(404).json({
        message: "No trains available for selected route",
      });
    } else {
      res.status(200).json({ trains });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
