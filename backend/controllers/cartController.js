const Cart = require('../model/cartModel');

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ success: false, message: "No cart found for this user." });
        }
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; 

    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity }],
            });
        } else {
            // If cart exists, add or update the item
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                
                cart.items[itemIndex].quantity += quantity;
            } else {
               
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id; 
        const { itemId } = req.body; 

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();

        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};