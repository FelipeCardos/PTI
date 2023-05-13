import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavbarConsumer.css";

export default function NavbarConsumer() {
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
      <div className='shoppingCartNavbarConsumer'>
        <button
          className='shoppingCartButtonNavbarConsumer'
          onClick={() => {
            navigate("/shopping-cart");
          }}
        >
          <i className='fa fa-shopping-cart'></i>
        </button>
        <span className='shoppingCartBadgeNavbarConsumer'>0</span>
      </div>
      <div className='notificationBellNavbarConsumer'>
        <button className='notificationBellButtonNavbarConsumer'>
          <i className='fa fa-bell'></i>
        </button>
        <span className='notificationBellBadgeNavbarConsumer'>0</span>
      </div>
      <div className='accountNavbarConsumer'>
        <button onClick={handleClick} className='accountButtonNavbarConsumer'>
          <i className='fa fa-user'></i>
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
