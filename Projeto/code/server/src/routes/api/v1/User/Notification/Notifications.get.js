const express = require("express");

const {
  FindAllNotifications,
  FindNotificationWithId,
  FindAllNotificationsWithUserId,
  FindAllNotificationsWithUserIdNotSeen,
} = require("../../../../../controllers/Notification/findNotification");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const userId = req.params.id;
  const notifications = await FindAllNotificationsWithUserId(userId);
  res.send(notifications);
});

module.exports = router;
