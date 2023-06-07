import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../assets/UserContext";
import NotificationExample from "./NotificationExample/NotificationExample";
import "./Notifications.css";

export default function Notifications() {
  const { myUserVariable } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getNotifications() {
      const notifications = await axios.get(
        `http://localhost:3000/api/v1/users/${myUserVariable.user_id}/notifications`
      );
      return notifications.data;
    }

    const interval = setInterval(() => {
      getNotifications().then((notifications) =>
        setNotifications(notifications)
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className='notificationsTitle'>Notifications</div>
      <hr className='notificationsTitleHR' />
      <div className='containerNotificationsExamples'>
        {notifications.map((notification) => (
          <NotificationExample
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </>
  );
}
