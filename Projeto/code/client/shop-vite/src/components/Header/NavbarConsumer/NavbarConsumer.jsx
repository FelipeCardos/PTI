import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavbarConsumer.css";

export default function NavbarConsumer({ user }) {
  const [shoppingCartNumber, setShoppingCartNumber] = useState(0);
  const [notificationsNumber, setNotificationsNumber] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    async function getShoppingCartNumberOfProducts() {
      let numberOfProducts = 0;
      const cart = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/users/" +
          user.userId +
          "/shoppingCart",
        { withCredentials: true }
      );
      const cartlines = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/carts/" +
          cart.data.id +
          "/cartLines"
      );
      for (const cartline of cartlines.data) {
        numberOfProducts += cartline.amount;
      }
      return numberOfProducts;
    }
    async function getNotifications() {
      const notifications = await axios.get(
        "https://yourlocalshop.pt:3000/api/v1/users/" +
          user.userId +
          "/notifications",
        { withCredentials: true }
      );
      return notifications.data;
    }

    getShoppingCartNumberOfProducts().then((res) => setShoppingCartNumber(res));
    getNotifications().then((res) => {
      setNotifications(res);
      let notificationsNumber = 0;
      for (const notification of res) {
        if (!notification.seen) notificationsNumber++;
      }
      setNotificationsNumber(notificationsNumber);
    });

    const interval = setInterval(() => {
      getShoppingCartNumberOfProducts().then((res) =>
        setShoppingCartNumber(res)
      );
      getNotifications().then((res) => {
        setNotifications(res);
        let notificationsNumber = 0;
        for (const notification of res) {
          if (!notification.seen) notificationsNumber++;
        }
        setNotificationsNumber(notificationsNumber);
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  async function handleMouseOverNotification(notification) {
    if (!notification.seen) {
      await axios.put(
        `https://yourlocalshop.pt:3000/api/v1/users/${notification.user_id}/notifications/${notification.id}`
      );
    }
  }

  async function handleLogout() {
    await axios.get("https://yourlocalshop.pt:3000/api/v1/auth/logout", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      withCredentials: true,
    });
    console.log("logout");
    return (window.location.href = "https://yourlocalshop.pt");
  }

  return (
    <div className='navConsumer'>
      <div
        className='logoNavbarConsumer'
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} className='logo' />
      </div>
      <div className='productsNavbarConsumer'>
        <button
          onClick={() => {
            navigate("/products");
          }}
          className='productsButtonNavbarConsumer'
        >
          Products
        </button>
      </div>
      <div className='searchNavbarConsumer'>
        <form onSubmit={handleSearch} className='search-form'>
          <input
            type='text'
            className='searchBarNavbar'
            name='searchQuery'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type='submit' className='searchButtonNavbarConsumer'>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
      <div className='shoppingCartNavbarConsumer' title='Shopping Cart'>
        <button
          className='shoppingCartButtonNavbarConsumer'
          onClick={() => {
            navigate("/shopping-cart");
          }}
        >
          <i className='fa fa-shopping-cart'></i>
        </button>
        <span className='shoppingCartBadgeNavbarConsumer'>
          {shoppingCartNumber > 9 ? "9+" : shoppingCartNumber}
        </span>
      </div>
      <div className='notificationBellNavbarConsumer' title='Notifications'>
        <button
          className='notificationBellButtonNavbarConsumer'
          onClick={handleClick2}
        >
          <i className='fa fa-bell'></i>
        </button>
        <span className='notificationBellBadgeNavbarConsumer'>
          {notificationsNumber}
        </span>
        <Menu
          id='basic-menu2'
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <div className='notificationMenuNavbarConsumer'>
            {notifications.length > 0 ? (
              [...notifications].reverse().map((notification) => {
                return (
                  <MenuItem
                    onMouseOver={() =>
                      handleMouseOverNotification(notification)
                    }
                  >
                    <div
                      className={
                        notification.seen
                          ? "notificationMenuNavbarConsumerSeen"
                          : "notificationMenuNavbarConsumerUnseen"
                      }
                    >
                      <p>{notification.description}</p>
                    </div>
                  </MenuItem>
                );
              })
            ) : (
              <p>No notifications</p>
            )}
          </div>
        </Menu>
      </div>
      <div className='accountNavbarConsumer'>
        <button onClick={handleClick} className='accountButtonNavbarConsumer'>
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
