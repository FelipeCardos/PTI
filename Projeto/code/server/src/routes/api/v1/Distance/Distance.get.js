const express = require("express");

const {
  getCoordinatesFromAddress,
  getCoordinatesFromUserAndProduct,
  CalculateDistance,
} = require("../../../../controllers/Maps/map");

const router = express.Router();

router.get("/", async (req, res) => {
  const lat1 = req.query.lat1;
  const lon1 = req.query.lon1;
  const lat2 = req.query.lat2;
  const lon2 = req.query.lon2;
  const distance = CalculateDistance(lon1, lat1, lon2, lat2);
  return res.status(200).json({ distance: distance });
});

module.exports = router;
