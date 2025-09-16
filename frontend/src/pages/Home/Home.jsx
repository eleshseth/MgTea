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
      <div className='advantage'>
        <div className='advantage-img-col'>
          <img src={assets.ben} alt='Advantage' className='advantage-img' />
        </div>
        <div className='advantage-text-col'>
          <h2>Key Advantages</h2>
          <ul>
            <li>Boosts overall wellness naturally</li>
            <li>Enhances energy and focus</li>
            <li>Supports healthy digestion</li>
            <li>Strengthens immune defense</li>
            <li>Refreshing and delicious taste</li>
          </ul>
        </div>
      </div>
      {/* <img src={assets.copy} width='100%' height='100%' /> */}
    </div>
  );
};

export default Home;
