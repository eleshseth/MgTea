import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../../components/Fooditem/Fooditem';
import axios from 'axios';
import './Wishlist.css';

const Wishlist = () => {
  const { url, token } = useContext(StoreContext);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  const fetchWishlist = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${url}/api/wishlist/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setWishlistItems(response.data.data || []);
      } else {
        console.error('Failed to fetch wishlist:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className='wishlist-container'>
        <div className='wishlist-empty'>
          <h2>Please login to view your wishlist</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='wishlist-container'>
        <div className='wishlist-loading'>
          <h2>Loading your wishlist...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className='wishlist-container'>
      <h2>My Wishlist ({wishlistItems.length} items)</h2>
      {wishlistItems.length === 0 ? (
        <div className='wishlist-empty'>
          <h3>Your wishlist is empty</h3>
          <p>Add some items to your wishlist to see them here!</p>
        </div>
      ) : (
        <div className='wishlist-items'>
          {wishlistItems.map((item) => (
            <Fooditem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              images={item.images}
              stock={item.stock}
              discount={item.discount || 0} // Add discount prop with fallback
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
