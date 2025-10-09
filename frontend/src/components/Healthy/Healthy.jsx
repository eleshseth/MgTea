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
              🟢 Help neutralize harmful radicals, strengthen immunity, reduce
              inflammation, and lower the risk of chronic diseases. Impact:
              Supports healthy aging and protects cells from oxidative stress.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> 20–40 mg Caffeine (per cup)</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Improves alertness, concentration, and energy levels. Enhances
              mood, boosts metabolism, and supports better physical performance.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>20–30 mg L-Theanine</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Promotes calmness without drowsiness, reduces stress and
              anxiety, and enhances focus when combined with caffeine.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>2–5 mg Magnesium (per cup)</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Essential for muscle and nerve function, regulates blood sugar
              and blood pressure, supports healthy bones and heart.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> 3–5 mg Potassium (per cup)</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Maintains fluid balance, improves nerve signals, manages blood
              pressure
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>Trace Fluoride (0.1–0.3 mg per cup)</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Strengthens teeth and gums, protects enamel, and prevents
              dental cavities naturally.
            </p>
          </div>
        </div>
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'>Naturally Low in Calories</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Ideal for weight management. When consumed without sugar or
              milk, tea is virtually calorie-free.
            </p>
          </div>
        </div>{' '}
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> Polyphenols & Tannins</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Aid digestion, improve gut health, regulate cholesterol, and
              support cardiovascular health.
            </p>
          </div>
        </div>{' '}
        <div className='healthy-water-list'>
          <div className='water-list-header'>
            <p className='water-title'> 8.0- 9.5 pH Alkanity</p>
          </div>
          <div className='water-list-body'>
            <p>
              🟢 Naturally alkaline minerals and presence of bicarbonates impart
              a naturally alkaline pH. It helps boost immunity, has antioxidant
              properties, reduces inflammation and prevents chronic diseases.
            </p>
          </div>
        </div>{' '}
      </div>
      <p className='healthy-water-text' style={{ marginTop: '10px' , fontWeight: '600' }}>
        Experience the perfect balance of taste and wellness — one soothing cup
        of tea at a time.
      </p>

    </div>
  );
};

export default Healthy;
