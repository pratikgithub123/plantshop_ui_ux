import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addtoCartsApi } from '../apis/Api'; 
import { toast } from 'react-toastify';

const Card = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const user = JSON.parse(localStorage.getItem("user")); 
  const userId = user?._id; 

  const handleAddToCart = async () => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    const formData = {
      userId,
      productId: product._id,
      quantity
    };

    try {
      const response = await addtoCartsApi(formData);
      if (response.data.success) {
        toast.success('Item Added Successfully')
        console.log(`Added ${product.productName} to the cart with ${quantity} kg`);
      } else {
        console.error('Error adding to cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  const totalPrice = (product.productPrice * quantity).toFixed(2);

  return (
    <li className="product-item">
      <div className="product-details">
        <Link to={`/product/${product._id}`}>
          <img className="product-images" src={product.productImageUrl} alt={product.productName} />
        </Link>
        <div className="product-info">
          <h3>{product.productName}</h3>
          <p className="product-price">Price: Rs {product.productPrice} per KG</p>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            />
            <label>KG</label>
          </div>
          <p>Total Price: Rs {totalPrice}</p>
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default Card;
