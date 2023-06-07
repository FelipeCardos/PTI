const express = require("express");

const {
  UpdateNotificationWithId,
} = require("../../../../../controllers/Notification/updateNotification");

const router = express.Router({ mergeParams: true });

router.put("/:notificationId", async (req, res) => {
  const userId = req.params.id;
  const notificationId = req.params.notificationId;
  const notification = await UpdateNotificationWithId(notificationId);
  res.send(notification);
});

module.exports = router;
