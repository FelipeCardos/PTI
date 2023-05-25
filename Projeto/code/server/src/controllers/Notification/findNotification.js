const { Notification } = require("../../database/models");

async function FindAllNotifications() {
  const notifications = await Notification.findAll();
  return notifications;
}

async function FindNotificationWithId(notificationId) {
  const notification = await Notification.findOne({
    where: {
      id: notificationId,
    },
  });
  return notification;
}

async function FindAllNotificationsWithUserId(userId) {
  const notification = await Notification.findAll({
    where: {
      user_id: userId,
    },
  });
  return notification;
}

async function FindAllNotificationsWithUserIdNotSeen(userId) {
  const notification = await Notification.findAll({
    where: {
      user_id: userId,
      seen: false,
    },
  });
  return notification;
}

module.exports = {
  FindAllNotifications,
  FindNotificationWithId,
  FindAllNotificationsWithUserId,
  FindAllNotificationsWithUserIdNotSeen,
};
