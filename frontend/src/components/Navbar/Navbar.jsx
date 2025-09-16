import React, { useState, useContext } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import LoginPopup from '../LoginPopup/LoginPopup';
import Search from '../Search/Search';

const Navbar = ({ setShowLogin, showLogin }) => {
  const [menu, setMenu] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalCartAmount, token, setToken,  setUserData } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserData(null);
    navigate('/');
  };

  const handleCartClick = (e) => {
    if (!token) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // const handleMenuClick = () => {
  //   setMenu('menu');
  //   setIsMobileMenuOpen(false);
  //   const foodDisplay = document.getElementById('food-display');
  //   if (foodDisplay) {
  //     foodDisplay.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <div className='navbar'>
      <img
        src={assets.logofinal}
        alt='Alkaline Water Logo'
        className='navbar-logo'
      />

      <div className='hamburger-menu' onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        <Link
          to='/'
          onClick={() => {
            setMenu('home');
            setIsMobileMenuOpen(false);
          }}
          className={menu === 'home' ? 'active' : ''}>
          Home
        </Link>
        <Link
          to='/menu'
          onClick={() => {
            setMenu('menu');
            setIsMobileMenuOpen(false);
          }}
          className={menu === 'menu' ? 'active' : ''}>
          Menu
        </Link>
        <Link
          to='/alkanity'
          onClick={() => {
            setMenu('alkanity');
            setIsMobileMenuOpen(false);
          }}
          className={menu === 'alkanity' ? 'active' : ''}>
          Alkalinity
        </Link>
        <Link
          to='/sustainability'
          onClick={() => {
            setMenu('sustainability');
            setIsMobileMenuOpen(false);
          }}
          className={menu === 'sustainability' ? 'active' : ''}>
          Sustainability
        </Link>
        <Link
          to='/origin'
          onClick={() => {
            setMenu('origin');
            setIsMobileMenuOpen(false);
          }}
          className={menu === 'origin' ? 'active' : ''}>
          Origin
        </Link>
        {/* <Link
          to='/blog'
          onClick={() => {
            setMenu('blog');
            setIsMobileMenuOpen(false);
          }}
          className={menu === 'blog' ? 'active' : ''}>
          BLOG
        </Link> */}
        <Link
          to='/contact'
          onClick={() => {
            setMenu('contact');
            setIsMobileMenuOpen(false);
          }}
          className={menu === 'contact' ? 'active' : ''}>
          Contact
        </Link>
      </ul>
      <div className='navbar-right'>
        <img
          src={assets.search_icon}
          alt=''
          onClick={() => setShowSearch(true)}
          style={{ cursor: 'pointer' }}
        />
        <div className='navbar-search-icon'>
          <Link to='/Cart' onClick={handleCartClick}>
            <img src={assets.basket_icon} alt='' />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        <img
          src={assets.heart_icon}
          alt='Wishlist'
          className='navbar-wishlist-icon'
          onClick={() => navigate('/wishlist')}
          style={{ cursor: 'pointer' }}
        />
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Login</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='' />

            <ul className='navbar-profile-dropdown'>
              <li>
                <Link
                  to='/orders'
                  style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={assets.bag_icon} alt='' />
                  <p>Orders</p>
                </Link>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt='' />
                <p>Logout</p>
              </li>
            </ul>
            {/* <p className='navbar-profile-user-name'>
              {userData?.name || 'User'}
            </p> */}
          </div>
        )}
      </div>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </div>
  );
};

export default Navbar;
