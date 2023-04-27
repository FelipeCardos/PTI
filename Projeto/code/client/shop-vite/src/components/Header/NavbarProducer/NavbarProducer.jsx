import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./NavbarProducer.css";

export default function NavbarProducer() {
  let navigate = useNavigate();

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
        <button
          onClick={() => {
            navigate("/account-overview");
          }}
          className='accountButtonNavbarProducer'
        >
          <i className='fa fa-user'></i>
        </button>
      </div>
    </div>
  );
}

// LOGO - PRODUCTS - SEARCHBAR - SHOPPING BASKET - NOTIFICATIONS - ACCOUNT
