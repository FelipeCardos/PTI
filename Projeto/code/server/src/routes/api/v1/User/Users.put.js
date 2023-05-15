const express = require("express");

const Address = require("./Address/Users.Address.put");
const Vehicle = require("./Vehicle/Users.Vehicles.put");

const router = express.Router();

const { UpdateUser } = require("../../../../controllers/User/updateUser");

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, fiscal_identifier, address_id, phone } = req.body;
  UpdateUser(id, name, phone, fiscal_identifier, address_id).then((bool) => {
    if (bool) {
      res.status(200).send("Updated");
    } else {
      res.status(500).send("Internal Server Error");
    }
  });
});

router.use("/:id/address", Address);
router.use("/:id/vehicles", Vehicle);

module.exports = router;
