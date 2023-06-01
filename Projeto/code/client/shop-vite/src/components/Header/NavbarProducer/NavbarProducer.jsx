import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavbarProducer.css";

export default function NavbarProducer({ user }) {
  const [notificationsNumber, setNotificationsNumber] = useState(0);
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function getNumberOfNotifications() {
      const notifications = await axios.get(
        "http://localhost:3000/api/v1/users/" + user.userId + "/notifications",
        { withCredentials: true }
      );
      return notifications.data.length;
    }
    getNumberOfNotifications().then((res) => setNotificationsNumber(res));

    const interval = setInterval(() => {
      getNumberOfNotifications().then((res) => setNotificationsNumber(res));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  async function handleLogout() {
    await axios.get("http://localhost:3000/api/v1/auth/logout", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });
    console.log("logout");
    return window.location.reload();
  }

  return (
    <div className='navProducer'>
      <div
        className='logoNavbarProducer'
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} className='logo' />
      </div>
      <div className='productsNavbarProducer'>
        <button
          onClick={() => {
            navigate("/products");
          }}
          className='productsButtonNavbarProducer'
        >
          Products
        </button>
      </div>
      <div className='searchNavbarProducer'>
        <input
          type='text'
          className='searchBarNavbarProducer'
          name='searchQuery'
          placeholder='Search...'
        />
        <button type='button' className='searchButtonNavbarProducer'>
          <i className='fa fa-search'></i>
        </button>
      </div>
      <div className='managementAreaNavbarProducer'>
        <button
          className='managementAreaButtonNavbarProducer'
          onClick={() => {
            navigate("/management-area");
          }}
        >
          <i className='fa fa-network-wired'></i>
        </button>
      </div>
      <div className='notificationBellNavbarProducer'>
        <button className='notificationBellButtonNavbarProducer'>
          <i className='fa fa-bell'></i>
        </button>
        <span className='notificationBellBadgeNavbarProducer'>
          {notificationsNumber}
        </span>
      </div>
      <div className='accountNavbarProducer'>
        <button onClick={handleClick} className='accountButtonNavbarProducer'>
          <i className='fa fa-user'></i>
          <p>Olá, {user.userName}</p>
        </button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/account-overview");
            }}
          >
            Account Overview
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              handleLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

// LOGO - PRODUCTS - SEARCHBAR - SHOPPING BASKET - NOTIFICATIONS - ACCOUNT
