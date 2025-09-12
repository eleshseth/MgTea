import React from 'react';
import './OfferStrip.css';

const OfferStrip = () => (
  <div className='offer-strip'>
    <marquee behavior='scroll' direction='left'>
      Special Offer: Get 20% off on your first order! Use code: WELCOME20
    </marquee>
  </div>
);

export default OfferStrip;
