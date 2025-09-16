import React, { useEffect, useState } from 'react';
import './Wishlist.css';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Refetch wishlist when page loads or after add/remove
  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    const res = await fetch('http://localhost:8009/api/wishlist', {
      headers: {
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success && data.wishlist && Array.isArray(data.wishlist.items)) {
      // Use populated foodId object
      const wishedFood = data.wishlist.items
        .map((item) => {
          if (
            item.foodId &&
            typeof item.foodId === 'object' &&
            item.foodId._id &&
            item.foodId.image // ensure populated
          ) {
            return item.foodId;
          }
          return null;
        })
        .filter(Boolean);
      setWishlist(wishedFood);
    } else {
      setWishlist([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className='wishlist-page'>
      <h2>Your Wishlist</h2>
      {loading ? (
        <p className='wishlist-empty'>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p className='wishlist-empty'>
          No items in your wishlist.
          <br />
        </p>
      ) : (
        <div className='wishlist-list'>
          {wishlist.map((foodObj) => (
            <div className='wishlist-item' key={foodObj._id}>
              <img
                src={foodObj.image}
                alt={foodObj.name}
                className='wishlist-item-img'
                onClick={() => navigate(`/product/${foodObj._id}`)}
                style={{ cursor: 'pointer' }}
              />
              <div className='wishlist-item-info'>
                <h3>{foodObj.name}</h3>
                <p>₹{foodObj.price}</p>
                <button
                  className='wishlist-view-btn'
                  onClick={() => navigate(`/product/${foodObj._id}`)}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
