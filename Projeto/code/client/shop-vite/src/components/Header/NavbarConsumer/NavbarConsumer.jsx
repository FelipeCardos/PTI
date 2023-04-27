import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavbarConsumer.css";

export default function NavbarConsumer() {
  let navigate = useNavigate();

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
        <button
          onClick={() => {
            navigate("/account-overview");
          }}
          className='accountButtonNavbarConsumer'
        >
          <i className='fa fa-user'></i>
        </button>
      </div>
    </div>
  );
}

// LOGO - PRODUCTS - SEARCHBAR - SHOPPING BASKET - NOTIFICATIONS - ACCOUNT
