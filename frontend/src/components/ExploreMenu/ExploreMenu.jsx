import React from 'react';
import './ExploreMenu.css';
import { menu_list } from "../../assets/assets"


const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Herbal Tea</h1>
      <p className='explore-menu-text'>
        MG India offers premium herbal tea for a healthier you. MG India
        provides natural refreshment and enhances overall well-being. True
        wellness begins from within, and herbal tea supports a revitalized body
        and mind. Each cup is crafted with a perfect balance of nature’s finest
        herbs, enriched with antioxidants, vitamins, and minerals. This helps
        boost immunity, support digestion, and promote relaxation. The unique
        infusion process brings out the pure essence of the herbs, creating a
        tea rich in natural goodness that helps neutralize free radicals and
        reduce oxidative stress. The herbal blend works gently yet
        effectively—improving metabolism, aiding detoxification, and calming the
        mind. This results in deeper relaxation, improved energy, and a
        refreshed spirit. MG India provides a path to a healthier you, whether
        you seek enhanced focus and energy, better digestion, stronger immunity,
        or inner calm. Explore the range of premium herbal tea blends. Begin
        your journey of transformative wellness—one soothing cup at a time.
      </p>

      <button
        className='watch-button'
        onClick={() =>
          window.open('https://www.youtube.com/watch?v=uDACCsXARLU', '_blank')
        }>
        Watch
      </button>

      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev == item.menu_name ? 'All' : item.menu_name
                )
              }
              key={index}
              className='explore-menu-list-item'>
              <img
                className={category === item.menu_name ? 'active' : ''}
                src={item.menu_image}
                alt=''
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
