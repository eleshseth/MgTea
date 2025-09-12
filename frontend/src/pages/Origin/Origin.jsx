import React from 'react';
import './Origin.css';
import { assets } from '../../assets/assets';

const Origin = () => {
  return (
    <div className='origin-container'>
      <div className='origin-image'>
        <img src={assets.origin} alt='Origin' className='desktop-origin' />
        <img
          src={assets.originmobile}
          alt='Origin Mobile'
          className='mobile-origin'
        />
      </div>
      <div className='origin-image1'>
      
        <img src={assets.origin2} alt='Origin 2' />
      </div>
    </div>
  );
};

export default Origin;
