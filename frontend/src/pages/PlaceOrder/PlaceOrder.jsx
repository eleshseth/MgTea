import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Place order and integrate Razorpay
  const placeOrder = async (event) => {
    event.preventDefault();

    // Prepare order items
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          ...item,
          quantity: cartItems[item._id],
          // Use discounted price for order
          price: Math.round(item.price * 0.7),
        };
        orderItems.push(itemInfo);
      }
    });

    // Decode token to get userId
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.id;

    // Prepare order data
    const orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 0),
    };

    try {
      // Create Razorpay order without storing in DB
      const response = await axios.post(
        `${url}/api/order/create-razorpay`,
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        const { order, razorpayOrderId } = response.data;

        // Configure all Razorpay options
        const options = {
          key: 'rzp_live_aJx1lD3Co3WbmE', // Using test key from backend
          amount: order.amount, // Amount in paise
          currency: 'INR',
          name: 'Food Store',
          description: 'Order Payment',
          order_id: razorpayOrderId, // Razorpay Order ID
          handler: async function (response) {
            if (
              !response.razorpay_payment_id ||
              !response.razorpay_order_id ||
              !response.razorpay_signature
            ) {
              toast.error('Payment failed! Please try again.');
              return;
            }
            try {
              const verifyRes = await axios.post(
                `${url}/api/order/verify`,
                { response, orderData }, // Include orderData for verification
                { headers: { token } }
              );
              if (verifyRes.data.success) {
                setCartItems({});
                toast.success('Order placed successfully!');
                navigate('/orders');
              } else {
                toast.error('Payment verification failed! Please try again.');
              }
            } catch (err) {
              console.error('Error verifying payment:', err);
              toast.error('Payment verification failed! Please try again.');
            }
          },
          modal: {
            ondismiss: function () {
              toast.info('Payment cancelled by user');
            },
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: '#F37254',
          },
        };

        try {
          const rzp1 = new window.Razorpay(options);

          // Handle errors in payment initialization
          rzp1.on('payment.failed', function (resp) {
            toast.error('Payment failed! Please try again.');
            console.error('Payment failed:', resp.error);
          });

          // Open the payment popup
          rzp1.open();
        } catch (error) {
          console.error('Error initializing Razorpay:', error);
          toast.error('Could not initialize payment. Please try again.');
        }
      } else {
        toast.error('Error creating payment order');
      }
    } catch (error) {
      console.error('Error creating payment order:', error);
      toast.error('Error creating payment order');
    }
  };

  // COD functionality removed as it's not being used

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input
            required
            value={data.firstName}
            name='firstName'
            onChange={onChangeHandler}
            type='text'
            placeholder='First name'
          />
          <input
            required
            value={data.lastName}
            name='lastName'
            onChange={onChangeHandler}
            type='text'
            placeholder='Last name'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.email}
            name='email'
            type='email'
            onChange={onChangeHandler}
            placeholder='Email address'
          />
          <input
            required
            value={data.state}
            name='state'
            type='text'
            onChange={onChangeHandler}
            placeholder='State'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.city}
            name='city'
            type='text'
            onChange={onChangeHandler}
            placeholder='City'
          />
          <input
            required
            value={data.street}
            name='street'
            type='text'
            onChange={onChangeHandler}
            placeholder='Street'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.zipcode}
            name='zipcode'
            type='number'
            onChange={onChangeHandler}
            placeholder='Zip Code'
          />
          <input
            required
            value={data.country}
            name='country'
            type='text'
            onChange={onChangeHandler}
            placeholder='Country'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            value={data.phone}
            name='phone'
            type='number'
            onChange={onChangeHandler}
            placeholder='Phone Number'
          />
        </div>
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount() === 0 ? 0 : 0}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <b>Total</b>
            <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 0}</p>
          </div>
          <hr />
          <button type='submit'>PROCEED TO PAYMENT</button>
          {/* <button onClick={handleCodOrder}>PROCEED VIA COD</button> */}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
