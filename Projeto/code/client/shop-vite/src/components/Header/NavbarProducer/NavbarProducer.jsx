import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavbarProducer.css";

export default function NavbarProducer(props) {
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
        <span className='notificationBellBadgeNavbarProducer'>0</span>
      </div>
      <div className='accountNavbarProducer'>
        <button onClick={handleClick} className='accountButtonNavbarProducer'>
          <i className='fa fa-user'></i>
          <p>Olá, {props.userName}</p>
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
