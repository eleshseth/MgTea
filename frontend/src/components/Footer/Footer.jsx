import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section company-info'>
          {/* <img src={assets.logo} alt='TLO Food Chain' className='footer-logo' /> */}
          <p className='company-description'>
            At MG India, we bring you the pure essence of wellness through our
            carefully sourced green tea and herbal blends. Rooted in tradition
            and crafted with care, our products combine the richness of nature
            with the promise of good health. From soothing herbal infusions to
            refreshing green teas, each sip is designed to rejuvenate your body
            and mind—naturally
          </p>
          <div className='footer-social'>
            <a
              href='https://www.facebook.com/share/19n8wgqTLe/'
              target='_blank'>
              <img src={assets.facebook} alt='Facebook' />
            </a>
            <a href='https://twitter.com' target='_blank'>
              <img src={assets.twitter} alt='Twitter' />
            </a>
            <a
              href='https://www.instagram.com/driinkoxygenalkalinewater?utm_source=qr&igsh=cDBiYTAxYnQzeHlz'
              target='_blank'>
              <img src={assets.instagram} alt='Instagram' />
            </a>
          </div>
        </div>

        <div className='footer-section quick-links'>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/menu'>Menu</Link>
            </li>
            {/* <li>
              <Link to='/blog'>Blog</Link>
            </li> */}
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </div>

        <div className='footer-section contact-info'>
          <h3>Contact Info</h3>
          <ul>
            <li>
              <img src={assets.location} alt='Address' />
              <span>Kaushambi, Ghaziabad</span>
            </li>
            <li>
              <img src={assets.mobile} alt='Phone' />
              <span>+917011587762</span>
            </li>
            <li>
              <img src={assets.email} alt='Email' />
              <span>mgindiaherb@gmail.com</span>
            </li>
          </ul>
        </div>

        <div className='footer-section business-info'>
          <h3>Business Info</h3>
          <p>GST No: 09FETPS4036A1Z7</p>
          <p>Operating Hours: 10:00 AM - 06:00 PM</p>
          <p>All days including weekends</p>
        </div>

        <div className='footer-section policies'>
          <h3>Policies</h3>
          <ul>
            <li>
              <Link to='/terms'>Terms & Conditions</Link>
            </li>
            <li>
              <Link to='/privacy-policy'>Privacy Policy</Link>
            </li>
            <li>
              <Link to='/shipping-policy'>Shipping Policy</Link>
            </li>
            <li>
              <Link to='/cancellation'>Refund & Cancellation Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>
          &copy; {new Date().getFullYear()} MG India. All rights reserved
          <b> @Powered by MarketMinds Digital Solutions</b>
        </p>
        <div className='footer-bottom-links'>
          <Link to='/privacy-policy'>Privacy Policy</Link>
          <Link to='/terms'>Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
