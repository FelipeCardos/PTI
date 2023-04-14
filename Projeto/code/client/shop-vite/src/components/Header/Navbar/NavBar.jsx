import {
  AccountCircle,
  CompareArrows,
  Favorite,
  ShoppingCart,
} from "@mui/icons-material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  rgbToHex,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavBar.css";

export default function Navbar() {
  let navigate = useNavigate();

  return (
    <div className='nav'>
      <div style={{ width: "20%", cursor: "pointer" }}>
        <img
          src={logo}
          className='logo'
          onClick={() => {
            window.location.reload(false);
          }}
        />
      </div>
      <div className='input-group searchBar'>
        <input type='search' placeholder=' Search' />
        <button id='search-button' type='button' className='btn btn-primary'>
          <i className='fas fa-search' />
        </button>
      </div>
      <button className='btnShoppingBasket'>
        <ShoppingBasketIcon />
      </button>
      <button
        onClick={() => {
          navigate("/signup", { state: { signupType: "Consumer" } });
        }}
        className='btnSignUp'
      >
        Sign Up
      </button>
      <button
        onClick={() => {
          navigate("/signin");
        }}
        className='btnSignIn'
      >
        Sign In
      </button>
    </div>
  );
}
