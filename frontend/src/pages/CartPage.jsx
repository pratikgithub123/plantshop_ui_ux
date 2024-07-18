import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCartsApi, deleteCartApi } from '../apis/Api'; 
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getAllCartsApi(id);
        console.log('API Response:', response);
        if (response.data.success) {
          setCartItems(response.data.cart.items);
        } else {
          console.error('Error fetching cart:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [id]);

  const handleDeleteCartApi = async (productId) => {
    try {
      const formData = {
        userId: id,
        productId: productId
      };
      const response = await deleteCartApi(formData);
      console.log('Delete API Response:', response);
      if (response.data.success) {
        
        setCartItems(cartItems.filter(item => item.product._id !== productId));
        toast.success("Item Deleted")
      } else {
        console.error('Error deleting cart item:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const confirmAndDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      handleDeleteCartApi(productId);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item._id} className="py-4 flex">
              <img src={item.product.productImageUrl} alt={item.product.productName} className="product-image" />
              <div className="ml-4">
                <p className="text-lg font-semibold">{item.product.productName}</p>
                <p className="text-gray-500">Price: ${item.product.productPrice.toFixed(2)}</p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <button onClick={() => confirmAndDelete(item.product._id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default CartPage;
