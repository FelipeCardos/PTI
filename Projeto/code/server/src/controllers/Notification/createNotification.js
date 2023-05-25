const { Notification } = require("../../database/models");

async function CreateNotification(userId, description) {
  const notification = await Notification.create({
    user_id: userId,
    description: description,
    seen: false,
  });
  return notification;
}

module.exports = { CreateNotification };
