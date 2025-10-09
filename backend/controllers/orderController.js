import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js'; // Add this import
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { error } from 'console';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const verify = async (req, res) => {
  try {
    const { response, orderData } = req.body;

    if (!response || !orderData) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment response or order data',
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;

    // Validate all required payment fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment response',
      });
    }

    // Verify the payment signature
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: 'Payment verification failed!' });
    }

    // Verify payment status with Razorpay
    try {
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      if (payment.status !== 'captured') {
        return res.status(400).json({
          success: false,
          message: 'Payment not completed',
        });
      }
    } catch (err) {
      console.error('Error fetching payment status:', err);
      return res.status(400).json({
        success: false,
        message: 'Could not verify payment status',
      });
    }

    // Get order details from the request
    const { userId, items, amount, address } = orderData;

    // Update stock for each item
    for (const item of items) {
      const food = await foodModel.findById(item._id);
      if (food) {
        const newStock = Math.max(0, food.stock - item.quantity);
        await foodModel.findByIdAndUpdate(item._id, { stock: newStock });
      }
    }

    // Create the order only after successful payment verification
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: 'Food Processing',
      payment: true,
    });

    // Save the order and clear the cart
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: 'Payment verified and order created successfully!',
      order: newOrder,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Internal server error!' });
  }
};

const placeCodOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Update stock for each item before creating the order
    for (const item of items) {
      const food = await foodModel.findById(item._id);
      if (food) {
        const newStock = Math.max(0, food.stock - item.quantity);
        await foodModel.findByIdAndUpdate(item._id, { stock: newStock });
      }
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      orderId: 'COD-' + Date.now(),
      status: 'Food Processing',
      payment: false,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: 'Order placed successfully',
    });
  } catch (error) {
    console.error('Error placing COD order:', error);
    res.status(500).json({
      success: false,
      message: 'Error while placing order',
    });
  }
};

// Creates a Razorpay order without storing in DB
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const options = {
      amount: Number(amount * 100), // Razorpay requires amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Only return the Razorpay order details, don't create order in DB yet
    res.json({
      success: true,
      order: razorpayOrder,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment',
    });
  }
};
const getUserOrders = async (req, res) => {
  try {
    // Get userId from token payload
    const userId = req.body.userId; // Our auth middleware should set this

    const orders = await orderModel.find({ userId }).sort({ date: -1 }); // Sort by date descending

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
    });
  }
};

//listing orders for admin pa
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({
      success: true,
      data: orders,
      message: 'Orders fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
    });
  }
};

//api for updating order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderModel.findOneAndUpdate(
      { orderId: req.body.orderId }, // Use orderId instead of _id
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
    });
  }
};
const updateStoreStatus = async (req, res) => {
  try {
    const order = await orderModel.findOneAndUpdate(
      { orderId: req.body.orderId }, // Use orderId instead of _id
      { store: req.body.store },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      message: 'Store status updated successfully',
      order,
    });
  } catch (error) {
    console.error('Error updating Store status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
    });
  }
};

// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;
//     const order = await orderModel.findByIdAndUpdate(
//       orderId,
//       { status },
//       { new: true }
//     );

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: 'Order not found'
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Order status updated successfully',
//       order
//     });
//   } catch (error) {
//     console.error('Error updating order status:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating order status'
//     });
//   }
// };

// Add to exports
export {
  placeOrder,
  verify,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  placeCodOrder,
  updateStoreStatus,
  deleteOrder,
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findOneAndDelete({ orderId: orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    res.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
    });
  }
};
