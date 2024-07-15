const express = require('express')
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();
router.get('/get', authGuard, getCart);
router.post('/add', authGuard, addToCart);
router.delete('/remove', authGuard, removeFromCart);

module.exports = router;