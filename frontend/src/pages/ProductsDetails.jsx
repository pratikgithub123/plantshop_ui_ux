// ProductDetails.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './components/ProductDetails.css';
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:5000/api/product/get_product/${id}`;

    axios.get(apiUrl)
      .then(response => {
        if (response.data.success) {
          setProduct(response.data.product || null);
        } else {
          console.error('Error fetching product details:', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (product) {
      const updatedCart = [...cart];
      const existingCartItem = updatedCart.find(item => item._id === product._id);

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        updatedCart.push({
          _id: product._id,
          productName: product.productName,
          quantity: quantity,
          price: product.productPrice,
        });
      }

      setCart(updatedCart);
      console.log(`Added ${product.productName} to the cart with quantity ${quantity}`);
    }
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
  };

  const calculateTotalPriceWithIncrease = (price, quantity) => {
    const basePrice = price;
    const increaseFactor = 0.1; 
    const totalPrice = basePrice * (quantity);
    return totalPrice.toFixed(2);
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(calculateTotalPriceWithIncrease(item.price, item.quantity));
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Checkout clicked. Implement your checkout logic.');
  };

  return (
    <div className="product-details-container">
      {loading ? (
        <div className="loading-spinner">
          <p>Loading product details...</p>
        </div>
      ) : (
        <>
          {product ? (
            <div className="product-details-content">
              <div className="product-card">
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="product-image"
                />
                <div className="product-info">
                  <h1>{product.productName}</h1>
                  <p>Description: {product.productDescription}</p>
                  <p>Price: Rs {product.productPrice} per KG</p>
                  <div>
                    <label>Quantity:</label>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    />
                  </div>
                  <p>Total Price: Rs {calculateTotalPriceWithIncrease(product.productPrice, quantity)}</p>
                  <button onClick={addToCart} className="add-to-cart-btn">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Display Cart */}
              <div className="cart-section">
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <>
                    <ul>
                      {cart.map(item => (
                        <li key={item._id}>
                          {item.productName} - Rs {item.price} per KG
                          <div>
                            <label>Quantity:</label>
                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              onChange={(e) => updateCartItemQuantity(item._id, Math.max(1, parseInt(e.target.value)))}
                            />
                            <button onClick={() => removeFromCart(item._id)}>Remove</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p>Total Cart Price: Rs {calculateCartTotal()}</p>
                    <button onClick={handleCheckout} className="checkout-btn">
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <p>Product not found</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
