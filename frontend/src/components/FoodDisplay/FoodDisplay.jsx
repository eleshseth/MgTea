import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../Fooditem/Fooditem.jsx';

const FoodDisplay = ({ category, sort }) => {
  const { food_list } = useContext(StoreContext);

  let displayedItems = food_list;
  if (category && category !== 'All') {
    displayedItems = displayedItems.filter(
      (item) => item.category === category
    );
  }
  if (sort === 'asc') {
    displayedItems = [...displayedItems].sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    displayedItems = [...displayedItems].sort((a, b) => b.price - a.price);
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Shop Our Hearbal Tea From Here</h2>
      <div className='food-display-list'>
        {displayedItems.map((item) => {
          const isOutOfStock = item.stock <= 0;
          return (
            <Fooditem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              images={item.images} // Changed from image to images
              stock={item.stock}
              discount={item.discount || 0} // Add discount prop with fallback
              className={isOutOfStock ? 'out-of-stock' : ''}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
