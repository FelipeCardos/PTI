import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import './NavBar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='nav'>
      <div
        className='logoNavbar'
        onClick={() => {
          navigate('/');
        }}
      >
        <img src={logo} className='logo' alt='Logo' />
      </div>
      <div className='productsNavbar'>
        <button
          onClick={() => {
            navigate('/products');
          }}
          className='productsButtonNavbar'
        >
          Products
        </button>
      </div>
      <div className='searchNavbar'>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            className='searchBarNavbar'
            name='searchQuery'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type='submit' className='searchButtonNavbar'>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </div>
      <div className='becomeProducerNavbar' title='Become a Producer'>
        <button
          onClick={() => {
            navigate('/signup', { state: { signupType: 'Producer' } });
          }}
          className='becomeProducerButtonNavbar'
        >
          Become a Producer
        </button>
      </div>
      <div className='shoppingCartNavbar' title='Shopping Cart'>
        <button
          className='shoppingCartButtonNavbar'
          onClick={() => {
            navigate('/shopping-cart');
          }}
        >
          <i className='fa fa-shopping-cart'></i>
        </button>
        <span className='shoppingCartBadgeNavbar'>0</span>
      </div>
      <div className='signinNavbar' title='Sign In'>
        <button
          onClick={() => {
            navigate('/signin');
          }}
          className='signinButtonNavbar'
        >
          Sign In
        </button>
      </div>
      <div className='signupNavbar' title='Sign Up'>
        <button
          onClick={() => {
            navigate('/signup', { state: { signupType: 'Consumer' } });
          }}
          className='signupButtonNavbar'
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
