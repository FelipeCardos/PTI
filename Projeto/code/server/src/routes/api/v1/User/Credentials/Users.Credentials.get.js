const express = require("express");
const {
  FindCredentialsByUserId,
} = require("../../../../../controllers/Credentials/findCredentials.js");

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

module.exports = router;
