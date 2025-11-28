import { createContext } from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  // Use local development server
  //const url = 'https://api.mgindiamart.com';
  //https://api.driinkoxygen.com
  //'http://localhost:8009';
  const url = 'http://localhost:8010';

  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);
  const [userData, setUserData] = useState(null);

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const response = await axios.get(`${url}/api/user/check-auth`, {
          headers: {
            token: storedToken, // Changed from Authorization: Bearer format
          },
        });
        if (response.data.success) {
          setToken(storedToken);
          setUserData(response.data.data);
          await loadCartData(storedToken); // Load cart data after successful auth
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      setToken('');
      setUserData(null);
    }
  };

  useEffect(() => {
    async function loadData() {
      await Promise.all([fetchFoodList(), checkAuth()]);
    }
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + '/api/cart/add',
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + '/api/cart/remove',
        { itemId },
        { headers: { token } }
      );
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          // Calculate discounted price
          const discount = itemInfo.discount || 0;
          const finalPrice =
            discount > 0
              ? Math.round((itemInfo.price * (100 - discount)) / 100)
              : itemInfo.price;
          totalAmount += finalPrice * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + '/api/food/list');
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + '/api/cart/get',
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        setUserData(JSON.parse(localStorage.getItem('userData')));
        await loadCartData(localStorage.getItem('token'));
        // Add this line
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
    userData, // Add this line
    setUserData, // Add this line
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
