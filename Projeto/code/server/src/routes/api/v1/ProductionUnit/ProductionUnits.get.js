const express = require("express");

const Product = require("./Product/Products.get");

const {
  FindProductionUnitWithId,
  FindAllProductionUnits,
  FindAllProductionUnitsWithUserId,
} = require("../../../../controllers/ProductionUnit/findProductionUnit");
const {
  checkAuthenticated,
  checkUsersIsAdmin,
} = require("../../../../middleware/UserAuth");
const {
  FindAddressById,
} = require("../../../../controllers/Address/findAddress");
const {
  FindAllProductProductionUnit,
} = require("../../../../controllers/ProductProductionUnit/findProductProductionUnit");

const {
  getCoordinatesFromAddress,
  getCoordinatesFromUserAndProduct,
  calculatedistance,
} = require("../../../../controllers/Maps/map");

const router = express.Router();

router.get("/", async (req, res) => {
  const productionUnits = await FindAllProductionUnits();
  if (productionUnits === null) return res.status(404).send("Not Found");
  for (let productionUnit of productionUnits) {
    const address = await FindAddressById(productionUnit.address_id);
    productionUnit.dataValues["address"] = address;
  }
  return res.status(200).json({ productionUnits: productionUnits });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const productionUnit = await FindProductionUnitWithId(id);
  if (productionUnit === null) return res.status(404).send("Not Found");
  const address = await FindAddressById(productionUnit.address_id);
  productionUnit.dataValues["address"] = address;
  const coordinates = await getCoordinatesFromAddress(address);
  productionUnit.dataValues["coordinates"] = coordinates;
  return res.status(200).json({ productionUnit: productionUnit });
});

router.use("/:id/products", Product);

module.exports = router;
