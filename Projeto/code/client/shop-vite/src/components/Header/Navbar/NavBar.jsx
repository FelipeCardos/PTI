import {
  AccountCircle,
  CompareArrows,
  Favorite,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  rgbToHex,
  Toolbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import logo from "../../../assets/logo.png";
import "./NavBar.css";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function Navbar() {
  return (
    <div className='nav'>
      <div style={{ width: '20%' }}>
        <img src={logo} className='logo' />
      </div>
      <div className='input-group searchBar'>
        <input type='search' placeholder=" Search" />
        <button id='search-button' type='button' className='btn btn-primary'>
          <i className='fas fa-search' />
        </button>
      </div>
        <button className="btnShoppingBasket">
          <ShoppingBasketIcon />
        </button>
        <button className="btnSignUp">Sign Up</button>
        <button className="btnSignIn">Sign In</button>
    </div>
  );
}
