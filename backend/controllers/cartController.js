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

const deleteCartItem = async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({
            success: false,
            message: "UserId and ProductId are required"
        });
    }

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1); 
            await cart.save();

            return res.status(200).json({
                success: true,
                message: "Item removed from cart successfully",
                cart: cart
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

    } catch (error) {
        console.error("Error in deleting cart item:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        });
    }
}

module.exports = {
    addToCart, getCart, deleteCartItem
}
