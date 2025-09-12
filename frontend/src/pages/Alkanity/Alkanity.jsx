import React, { useState } from 'react';
import './Alkanity.css';
import { assets } from '../../assets/assets';

const Alkanity = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const benefits = [
    { image: assets.brain, name: 'Brain Health' },
    { image: assets.hydration, name: 'Hydration' },
    { image: assets.heart, name: 'Heart Health' },
    { image: assets.immunity, name: 'Immunity' },
    { image: assets.digestion, name: 'Digestion' },
    { image: assets.cholesterol, name: 'Cholesterol' },
    { image: assets.bones, name: 'Bone Health' },
    { image: assets.age, name: 'Anti-Aging' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (benefits.length - 4));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? benefits.length - 5 : prev - 1));
  };

  const visibleBenefits = benefits.slice(currentSlide, currentSlide + 5);

  return (
    <div className='alkanity-container'>
      <div className='alkanity-content'>
        <div className='alkanity-image'>
          <img src={assets.alkanity} alt='Water Alkalinity Process' />
        </div>
      </div>
      <div className='alkanity-text'>
        <p>
          Our water maintains a perfect pH balance between 8.0 and 9.5,
          providing optimal alkalinity for better health and hydration.
        </p>
      </div>
      <div className='bottle-benefit-image'>
        <img src={assets.Bottlebenefit} alt='Bottle Benefits' />
      </div>
      <div className='benefits-container'>
        <h2 className='benefits-heading'>
          We Are Not Saying It, Scientists Are.
        </h2>
        <p className='benefits-para'>Use Slider to know more</p>
        <div className='benefits-slider'>
          <button className='slider-button prev' onClick={prevSlide}>
            &lt;
          </button>
          {visibleBenefits.map((benefit, index) => (
            <div key={index} className='benefit-slide'>
              <img
                src={benefit.image}
                alt={benefit.name}
                className='benefit-image'
              />
              <p className='benefit-name'>{benefit.name}</p>
            </div>
          ))}
          <button className='slider-button next' onClick={nextSlide}>
            &gt;
          </button>
        </div>
      </div>
      <div className='image-layer'>
        <img src={assets.layer} alt='Decorative Layer' />
      </div>
    </div>
  );
};

export default Alkanity;
