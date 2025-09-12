import React from 'react';
import './Header.css';
import { assets } from '../../assets/assets';

const Header = () => {
  // const scrollToMenu = () => {
  //   const menuSection = document.getElementById('explore-menu');
  //   if (menuSection) {
  //     menuSection.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <>
      {/* <div className='offer-strip'>
        <marquee behavior='scroll' direction='left'>
          Special Offer: Get 20% off on your first order! Use code: WELCOME20
        </marquee>
      </div> */}
      <div className='header'>
        <video
          className='header-video'
          src={assets.bannervideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100vw',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
            opacity: 1,
          }}
        />
        <div
          className='header-contents'
          style={{ position: 'relative', zIndex: 1 }}>
          {/* <h2>
            Pure Blessings from the Himalayas  Order
            Today!
          </h2>
          <p>
          Bring home the sacred essence of the Himalayas. Pure, authentic Ganga
          water collected with care. A divine gift, delivered to your doorstep
          Order now!
        </p>
        <button onClick={scrollToMenu}>View Menu</button> */}
        </div>
      </div>
    </>
  );
};

export default Header;
