import React from "react";
import NotificationExample from "./NotificationExample/NotificationExample";
import "./Notifications.css";

export default function Notifications() {
  let notifications = [
    {
      id: 1,
      description: "Notificação 1",
    },
    {
      id: 2,
      description: "Notificação 2",
    },
  ];
  return (
    <>
      <div className='notificationsTitle'>Notifications</div>
      <hr className='notificationsTitleHR' />
      <div className='containerNotificationsExamples'>
        {notifications.map((notification) => (
          <NotificationExample
            key={notification.id}
            description={notification.description}
          />
        ))}
      </div>
    </>
  );
}
