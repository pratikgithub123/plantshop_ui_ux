// controllers/orderController.js
const Order = require('../models/orderModel');

const getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate('items.product');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const updates = req.body;

  try {
    const order = await Order.findByIdAndUpdate(orderId, updates, { new: true }).populate('items.product');
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = {
  getOrder,
  updateOrder,
  deleteOrder
};
