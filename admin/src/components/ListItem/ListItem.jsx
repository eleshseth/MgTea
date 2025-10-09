import React, { useContext, useState } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Fooditem = ({ id, name, price, image, stock }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWished, setIsWished] = useState(false);
  const navigate = useNavigate();

  const isOutOfStock = stock <= 0;
  const currentQuantity = cartItems[id] || 0;
  const remainingStock = stock - currentQuantity;

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  // Wishlist handler
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (loading) return;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to use the wishlist feature.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const url = isWished
        ? 'http://localhost:8009/api/wishlist/remove'
        : 'http://localhost:8009/api/wishlist/add';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token.startsWith('Bearer ')
            ? token
            : `Bearer ${token}`,
        },
        body: JSON.stringify({ foodId: id }),
      });
      if (!response.ok) {
        // If connection refused or server down, show a clear message
        alert(
          'Could not connect to backend. Please make sure your backend server is running on http://localhost:8009'
        );
        setLoading(false);
        return;
      }
      const data = await response.json();
      if (response.status === 401) {
        alert(
          data.message || 'Session expired or unauthorized. Please login again.'
        );
        setLoading(false);
        return;
      }
      if (data.success) {
        setIsWished(!isWished);
        alert(isWished ? 'Removed from wishlist' : 'Added to wishlist');
      } else {
        alert(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      alert(
        'Could not connect to backend. Please make sure your backend server is running on http://localhost:8009',
        err
      );
    }
    setLoading(false);
  };

  return (
    <div className={`main-container ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className='food-item'>
        <div
          className='food-item-img-container'
          style={{ position: 'relative' }}>
          <img
            className='food-item-image'
            src={imgError ? assets.food_1 : image}
            alt={name}
            onError={() => setImgError(true)}
            onClick={handleProductClick}
            style={{ cursor: 'pointer' }}
          />
          {/* Heart wishlist icon */}
          <img
            src={assets.heart_icon}
            alt='wishlist'
            className={`food-wishlist-icon${isWished ? ' wished' : ''}`}
            onClick={handleWishlistToggle}
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 32,
              height: 32,
              cursor: loading ? 'not-allowed' : 'pointer',
              filter: isWished
                ? 'drop-shadow(0 0 8px #41c21a) brightness(1.2)'
                : 'grayscale(1) opacity(0.85)',
              background: '#fff',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(65,194,26,0.10)',
              padding: 4,
              zIndex: 10,
              opacity: loading ? 0.5 : 1,
              display: 'block',
            }}
          />
          {!cartItems[id] ? (
            <img
              className={`add ${isOutOfStock ? 'disabled' : ''}`}
              onClick={() => !isOutOfStock && addToCart(id)}
              src={assets.add_icon_white}
              alt=''
            />
          ) : (
            <div className='food-item-counter'>
              <img
                src={assets.remove_icon_red}
                alt=''
                onClick={() => removeFromCart(id)}
              />
              <p>{cartItems[id]}</p>
              <img
                className={remainingStock <= 0 ? 'disabled' : ''}
                src={assets.add_icon_green}
                alt=''
                onClick={() => remainingStock > 0 && addToCart(id)}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className='food-item-info'
        onClick={handleProductClick}
        style={{ cursor: 'pointer' }}>
        <div className='food-item-name-rating'>
          <p>{name.replace(/\s*\([^)]*\)/g, '').trim()}</p>
          <span className='discount-badge'>30% OFF</span>
        </div>
      </div>
      <p className='food-item-price' dir='ltr'>
        <span className='original-price'>₹{price}</span>
        <b>₹</b>
        {Math.round(price * 0.7)}
        <span className='unit-text' dir='ltr'>
          {name.includes('kg') ? '/Kg' : name.includes('ltr') ? '/Ltr' : '/6Pc'}
        </span>
      </p>
      <p className={`stock-status ${isOutOfStock ? 'out-of-stock' : ''}`}>
        {isOutOfStock ? 'Out of Stock' : `Stock: ${remainingStock}`}
      </p>
    </div>
  );
};

export default Fooditem;
