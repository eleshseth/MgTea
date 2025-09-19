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
      <div className='origin-para'></div>
      <div className='origin-image1'>
        <img
          src={assets.element}
          alt='Origin 2'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className='origin-image1'>
        <img
          src={assets.plant}
          alt='Origin 2'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className='origin-image1'>
        <img
          src={assets.ecosystem}
          alt='Origin 2'
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      {/* Video as background for the footer content, similar to healthy class */}
      <div
        className='origin-footer-bg-container'
        style={{
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
          marginTop: 32,
        }}>
        <video
          className='home-drop-video-bg'
          src={assets.drop}
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
          }}>
          {/* Place your footer content here */}
          <div className='origin-footer-content'>
            <h2
              style={{
                color: '#e46c0c',
                textShadow: '0 2px 8px rgba(0,0,0,0.10)',
                margin: 0,
                paddingTop: 40,
                fontFamily: 'MuseoSans, Ubuntu, sans-serif',
                fontWeight: 700,
              }}>
              Experience the Origin Difference
            </h2>
            <p
              style={{
                color: '#e46c0c',

                fontSize: '1.15rem',
                margin: '18px auto 0 auto',
                maxWidth: 600,
              }}>
              From the foothills of the Himalayas to your cup, our journey is
              rooted in purity, sustainability, and wellness. Taste the legacy,
              feel the vitality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Origin;
