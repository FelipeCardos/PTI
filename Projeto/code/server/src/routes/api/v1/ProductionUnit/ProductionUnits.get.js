const express = require("express");

const {
  FindProductionUnitWithId,
  FindAllProductionUnits,
} = require("../../../../controllers/ProductionUnit/findProductionUnit");
const {
  checkAuthenticated,
  checkUsersIsAdmin,
} = require("../../../../middleware/UserAuth");
const {
  FindAddressById,
} = require("../../../../controllers/Address/findAddress");

const router = express.Router();

router.get("/", checkAuthenticated, checkUsersIsAdmin, async (req, res) => {
  FindAllProductionUnits().then((productionUnits) => {
    if (productionUnits === null) {
      res.status(404).send("Not Found");
    } else {
      for (let i = 0; i < productionUnits.length; i++) {
        FindAddressById(productionUnits[i].address_id).then((address) => {
          productionUnits[i].dataValues["address"] = address;
        });
      }
      res.status(200).json({ productionUnits: productionUnits });
    }
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  FindProductionUnitWithId(id).then((productionUnit) => {
    if (productionUnit === null) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json({ productionUnit: productionUnit });
    }
  });
});

module.exports = router;
