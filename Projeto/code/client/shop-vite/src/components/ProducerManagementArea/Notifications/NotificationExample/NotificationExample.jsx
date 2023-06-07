import axios from "axios";
import { useEffect, useState } from "react";
import "./NotificationExample.css";

export default function NotificationExample({ notification }) {
  const [noti, setNoti] = useState(notification);
  function handleNotificationClick() {
    axios.put(
      `http://localhost:3000/api/v1/users/${notification.user_id}/notifications/${notification.id}`
    );
    setNoti({ ...noti, seen: true });
  }
  return (
    <div className='notificationExample' onClick={handleNotificationClick}>
      {notification.description}
      {noti.seen ? null : (
        <div className='notificationSeen'>
          <i className='fa fa-exclamation'></i>
        </div>
      )}
    </div>
  );
}
