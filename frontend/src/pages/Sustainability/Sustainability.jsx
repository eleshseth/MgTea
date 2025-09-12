import React from 'react';
import './Sustainability.css';
import { assets } from '../../assets/assets';

const Sustainability = () => {
  return (
    <div>
      <div className='sustainability-container'>
        <div className='sustainability-image'>
          <img src={assets.sustain} alt='Sustainability' />
        </div>
      </div>
      <div className='Info'>
        <h1 className='heading'>PLASTIC NEUTRALITY AND RECYCLING</h1>
        <p className='p1'>
          Did you know that PET is the most recycled plastic in the world?
          Globally 45% of PET gets recycled. In India, 92% gets recycled due to
          a unique recycling ecosystem involving ragpickers, kabadiwalas and
          recyclers.
        </p>
        <p className='p2'>
          As of 2023, DriinkOxygen has successfully recycled over every PET
          bottles, actively contributing to a circular economy. Every bottle we
          produce has a buy-back price, ensuring an incentive for
          responsible disposal. We partner with trusted waste management
          agencies to facilitate the efficient collection and recycling of all
          our PET bottles, reaffirming our commitment to a cleaner planet, one
          bottle at a time.
        </p>
        <p className='p3'>
          This collection is done through EPR partner and our in-house recycling
          ecosystem. EPR (Extended Producers Responsibility) is geography and
          brand agnostic. Our recyclable PET bottles are repurposed into fabric,
          yarn, quilts, drainpipes, inner linings of cars, utilized in
          architecture and road-building.
        </p>
      </div>
      <div className='sustain-image'>
        <h1 className='image-heading'>SUSTAINABILITY IMPACT</h1>{' '}
      </div>{' '}
      <div className='impact-container'>
        <div className='impact-point'>
          <h3>Decreases Carbon Emission 42-50%</h3>
          <p>
            Our advanced recycling program has reduced carbon emissions by over
            50%, turning waste into eco-friendly products.
          </p>
        </div>
        <div className='impact-point'>
          <h3>Save Water Consumption up to 80-85%</h3>
          <p>
            Through water-efficient systems and smart technologies, we’ve
            reduced water usage by up to 85% in production.
          </p>
        </div>
        <div className='impact-point'>
          <h3>Forest Landfill Saved</h3>
          <p>
            Our sustainable practices have diverted waste from landfills,
            preserving over huge forest land.
          </p>
        </div>
        <div className='impact-point'>
          <h3>Electricity Consumption up to 75% Less</h3>
          <p>
            By using energy-efficient technologies and renewable energy, we’ve
            reduced our electricity consumption by 75%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;
