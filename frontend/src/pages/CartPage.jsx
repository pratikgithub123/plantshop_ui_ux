import React, { useEffect } from 'react';
import { useCart } from './CartContext';

const CartPage = () => {
  const { cartState, removeFromCart, getCart } = useCart();

  useEffect(() => {
    
    getCart();
  }, [getCart]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartState.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartState.map((item) => (
            <li key={item.productId}>
              <img src={item.productImage} alt={item.productName} style={{ width: '50px', marginRight: '10px' }} />
              {item.productName} - Rs {item.productPrice} per KG - Quantity: {item.quantity}
              <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
