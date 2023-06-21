const express = require("express");
const router = express.Router({ mergeParams: true });

const { FindUserById } = require("../../../../../controllers/User/findUsers");
const {
  FindAddressById,
} = require("../../../../../controllers/Address/findAddress");
const {
  getCoordinatesFromAddress,
  getCoordinatesFromUserAndProduct,
  calculatedistance,
} = require("../../../../../controllers/Maps/map");

router.get("/", async (req, res) => {
  const id = req.params.id;
  const user = await FindUserById(id);
  const address = await FindAddressById(user.address_id);
  const coordinates = await getCoordinatesFromAddress(address);
  return res
    .status(200)
    .json({
      address: { ...address.dataValues },
      coordinates: { ...coordinates },
    });
});

module.exports = router;
