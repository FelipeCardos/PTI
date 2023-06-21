const express = require("express");

const Address = require("./Address/Users.Address.put");
const Vehicle = require("./Vehicle/Users.Vehicles.put");
const Notification = require("./Notification/Notification.put");

const router = express.Router();

const { UpdateUser, UpdateUserStatusWithId } = require("../../../../controllers/User/updateUser");
const { FindUserById } = require("../../../../controllers/User/findUsers");

router.put("/:id/status", async (req,res) =>{
  try{
    const id = req.params.id;
    const {name, fiscal_identifier, address_id, phone, active} = req.body;    
    const user = await FindUserById(id);

    if (!user) return res.status(404).send("Not Found");

    const updatedUser = await UpdateUserStatusWithId(id);

    res.send(updatedUser);
  }catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
})

router.put("/:id", async (req, res) => {
  // http://localhost:3000/api/v1/users/:id
  try {
    const id = req.params.id;
    const { name, fiscal_identifier, address_id, phone } = req.body;

    const user = await FindUserById(id);

    if (!user) return res.status(404).send("Not Found");

    const updatedUser = await UpdateUser(
      id,
      name,
      phone,
      fiscal_identifier,
      address_id
    );

    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.use("/:id/address", Address);
router.use("/:id/vehicles", Vehicle);
router.use("/:id/notifications", Notification);

module.exports = router;
