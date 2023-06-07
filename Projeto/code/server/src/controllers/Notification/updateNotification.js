const { Notification } = require("../../database/models");

async function UpdateNotificationWithId(id) {
  const notification = await Notification.findOne({
    where: {
      id: id,
    },
  });
  notification.seen = true;
  await notification.save();
  return notification;
}

module.exports = {
  UpdateNotificationWithId,
};
