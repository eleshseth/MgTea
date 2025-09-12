import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Recycled from '../../components/Recycled/Recycled';
import Healthy from '../../components/Healthy/Healthy';
import { assets } from '../../assets/assets';
const Home = () => {
  const [category, setCategory] = useState('All');

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <div>
        <FoodDisplay category={category} />
      </div>
      <div
        className='healthy-bg-container'
        style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
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
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Healthy />
        </div>
      </div>
      <img
        src={assets.benifits}
        alt='Benefits'
        style={{
          width: '100%',
          height: 'auto',
          boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
          display: 'block',
          margin: '32px 0',
        }}
      />
      {/* <img src={assets.copy} width='100%' height='100%' /> */}
    </div>
  );
};

export default Home;
