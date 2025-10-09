import React, { useState } from 'react';
import './Menu.css';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const categories = ['All', 'Momo', 'Drinks', 'Meals', 'Desserts']; // Example categories
const sortOptions = [
  { label: 'None', value: '' },
  { label: 'Price: Low to High', value: 'asc' },
  { label: 'Price: High to Low', value: 'desc' },
];

const Menu = () => {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');

  return (
    <div className='menu-main-container'>
      <aside className='menu-sidebar'>
        <h3>Categories</h3>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              className={category === cat ? 'active' : ''}
              onClick={() => setCategory(cat)}>
              {cat}
            </li>
          ))}
        </ul>
        <h3>Sort By</h3>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </aside>
      <div className='menu-content'>
        <h1>Our Products</h1>
        <FoodDisplay category={category} sort={sort} />
      </div>
    </div>
  );
};

export default Menu;
