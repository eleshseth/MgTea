import React from 'react';
import './Healthy.css';

const Healthy = () => {
  return (
    <div className='explore-menu'>
      <h1>Why Our Tea is Healthy?</h1>
      <h3 className='subheading'>
        Naturally enriched with antioxidants, essential minerals, and bioactive
        compounds.
      </h3>
      <div className='healthy-water-list-container'>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>
              {' '}
              Rich in Antioxidants (Polyphenols, Catechins & Flavonoids)
            </p>
          </div>
          <div className='water-list-body'>
            <p>
              Benefits: Help neutralize harmful free radicals, strengthen
              immunity, reduce inflammation, and lower the risk of chronic
              diseases. Impact: Supports healthy aging and protects cells from
              oxidative stress.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> 20–40 mg Caffeine (per cup)</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'> 200–400 mg/day</p>
            <p>
              Benefits: Improves alertness, concentration, and energy levels.
              Enhances mood, boosts metabolism, and supports better physical
              performance.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>20–30 mg L-Theanine</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'>No strict limit; generally safe</p>
            <p>
              Benefits: Promotes calmness without drowsiness, reduces stress and
              anxiety, and enhances focus when combined with caffeine.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>2–5 mg Magnesium (per cup)</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'>Daily Intake*: 320–400 mg</p>
            <p>
              Benefits: Essential for muscle and nerve function, regulates blood
              sugar and blood pressure, supports healthy bones and heart.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> 3–5 mg Potassium (per cup)</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'>Daily Intake*: D3,500–4,700 mg</p>
            <p>
              Benefits: Maintains fluid balance, improves nerve signals, reduces
              blood pressure, and prevents kidney stones.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>Trace Fluoride (0.1–0.3 mg per cup)</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'> Daily Intake*:2–10 mg</p>
            <p>
              Benefits: Strengthens teeth and gums, protects enamel, and
              prevents dental cavities naturally.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>Naturally Low in Calories</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'> *Recommended Value: 70-400mg</p>
            <p>
              Benefits: Ideal for weight management. When consumed without sugar
              or milk, tea is virtually calorie-free.
            </p>
          </div>
        </div>{' '}
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> Polyphenols & Tannins</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'> Daily intake*: 3,500–4,700 mg</p>
            <p>
              Benefits: Aid digestion, improve gut health, regulate cholesterol,
              and support cardiovascular health.
            </p>
          </div>
        </div>{' '}
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> 8.0- 9.5 pH Alkanity</p>
          </div>
          <div className='water-list-body'>
            <p className='bold'> 280-350 Total Dissolved Solids</p>
            <p>
              Naturally alkaline minerals and presence of bicarbonates impart a
              naturally alkaline pH. It helps boost immunity, has antioxidant
              properties, reduces inflammation and prevents chronic diseases.
            </p>
          </div>
        </div>{' '}
      </div>
      <p className='healthy-water-text'>
        *Recommended Intake Value signifies an average daily level of intake
        sufficient to meet the nutrient requirements of a healthy person.
      </p>
      <p className='healthy-water-text'>*Average Minerals in mg/litre</p>
    </div>
  );
};

export default Healthy;
