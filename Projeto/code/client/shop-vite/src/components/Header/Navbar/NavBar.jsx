import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavBar.css";

export default function Navbar() {
  let navigate = useNavigate();

  return (
    <div className='nav'>
      <div
        className='logoNavbar'
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} className='logo' />
      </div>
      <div className='productsNavbar'>
        <button
          onClick={() => {
            navigate("/products");
          }}
          className='productsButtonNavbar'
        >
          Products
        </button>
      </div>
      <div className='searchNavbar'>
        <input
          type='text'
          className='searchBarNavbar'
          name='searchQuery'
          placeholder='Search...'
        />
        <button type='button' className='searchButtonNavbar'>
          <i className='fa fa-search'></i>
        </button>
      </div>
      <div className='becomeProducerNavbar'>
        <button
          onClick={() => {
            navigate("/signup", { state: { signupType: "Producer" } });
          }}
          className='becomeProducerButtonNavbar'
        >
          Become a Producer
        </button>
      </div>
      <div className='shoppingCartNavbar'>
        <button className='shoppingCartButtonNavbar'>
          <i className='fa fa-shopping-cart'></i>
        </button>
        <span className='shoppinCartBadgeNavbar'>0</span>
      </div>
      <div className='signinNavbar'>
        <button
          onClick={() => {
            navigate("/signin");
          }}
          className='signinButtonNavbar'
        >
          Sign In
        </button>
      </div>
      <div className='signupNavbar'>
        <button
          onClick={() => {
            navigate("/signup", { state: { signupType: "Consumer" } });
          }}
          className='signupButtonNavbar'
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

// LOGO - PRODUCTS - SEARCHBAR - BECOME A PRODUCER - SHOPPING BASKET - SIGN IN - SIGN UP
