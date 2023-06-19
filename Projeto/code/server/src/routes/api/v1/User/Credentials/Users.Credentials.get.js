const express = require("express");
const {
  FindCredentialsByUserId,
} = require("../../../../../controllers/Credentials/findCredentials.js");

const {
  FindUserWithEmail,
  FindUserOrCreate,
  FindUserById,
  FindAllUsers,
} = require("../../../../../controllers/User/findUsers.js");

const {
  ComparePassword,
  HashPassword,
} = require("../../../../../controllers/Auth/password.js");

const router = express.Router({ mergeParams: true });

router.get("/", (req, res) => {
  const userId = req.params.id;
  FindCredentialsByUserId(userId).then((credentials) => {
    if (credentials) {
      res.status(200).json({ credentials: credentials });
    } else {
      res.status(200).json({ credentials: "local" });
    }
  });
});

router.get("/password", async (req, res) => {
  const userId = req.params.id;
  const password = req.query.password;
  const user = await FindUserById(userId);
  if (user) {
    const user2 = await FindUserWithEmail(user.email);
    const valid = await ComparePassword(password, user2.password);
    res.status(200).json({ valid: valid });
  } else {
    res.status(404).send("Not Found");
  }
});

module.exports = router;
