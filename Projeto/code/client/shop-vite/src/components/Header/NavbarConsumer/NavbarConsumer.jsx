import { Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavbarConsumer.css";

export default function NavbarConsumer({ user }) {
  const [shoppingCartNumber, setShoppingCartNumber] = useState(0);
  const [notificationsNumber, setNotificationsNumber] = useState(0);

  useEffect(() => {
    async function getShoppingCartNumberOfProducts() {
      let numberOfProducts = 0;
      const cart = await axios.get(
        "http://localhost:3000/api/v1/users/" + user.userId + "/shoppingCart",
        { withCredentials: true }
      );
      const cartlines = await axios.get(
        "http://localhost:3000/api/v1/carts/" + cart.data.id + "/cartLines"
      );
      for (const cartline of cartlines.data) {
        numberOfProducts += cartline.amount;
      }
      return numberOfProducts;
    }
    async function getNumberOfNotifications() {
      const notifications = await axios.get(
        "http://localhost:3000/api/v1/users/" + user.userId + "/notifications",
        { withCredentials: true }
      );
      return notifications.data.length;
    }

    getShoppingCartNumberOfProducts().then((res) => setShoppingCartNumber(res));
    getNumberOfNotifications().then((res) => setNotificationsNumber(res));
  }, []);
  let navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <input
          type='text'
          className='searchBarNavbarConsumer'
          name='searchQuery'
          placeholder='Search...'
        />
        <button type='button' className='searchButtonNavbarConsumer'>
          <i className='fa fa-search'></i>
        </button>
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
        <button className='notificationBellButtonNavbarConsumer'>
          <i className='fa fa-bell'></i>
        </button>
        <span className='notificationBellBadgeNavbarConsumer'>
          {notificationsNumber}
        </span>
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
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

// LOGO - PRODUCTS - SEARCHBAR - SHOPPING BASKET - NOTIFICATIONS - ACCOUNT
