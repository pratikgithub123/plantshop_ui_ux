const Cart = require('../model/cartModel');
const Product = require("../model/productModel")
const User = require("../model/userModel")

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity) {
        return res.status(400).json({
            success: false,
            message: "UserId, Product, and quantity are required"
        })
    }
    try {
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity }]
            });
        } else {
            // Check if item already exists in cart and update quantity if so
            const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cart: cart
        });

    } catch (error) {
        console.log(`Error in add to cart is ${error}`)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getCart = async(req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart: cart
        });

    } catch (error) {
        console.error("Error in fetching cart:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
}

module.exports = {
    addToCart, getCart
}
