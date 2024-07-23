// routes/orderRoutes.js
const express = require('express');
const { getOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

const router = express.Router();

// Get order by ID
router.get('/orders/:orderId', getOrder);

// Update order by ID
router.put('/orders/:orderId', updateOrder);

// Delete order by ID
router.delete('/orders/:orderId', deleteOrder);

module.exports = router;
