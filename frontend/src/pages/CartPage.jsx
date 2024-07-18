import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCartApi, getAllCartsApi } from '../apis/Api';

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
        toast.success("Item Deleted");
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

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.product.productPrice * item.quantity);
  }, 0).toFixed(2);

  return (
    <div className="m-5">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : cartItems.length > 0 ? (
        <>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.product.productImageUrl} alt={item.product.productName} className="product-image" style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td>{item.product.productName}</td>
                  <td>${item.product.productPrice.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => confirmAndDelete(item.product._id)} type="button" className="btn btn-danger">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="3"></td>
                <td className="font-bold">Total:</td>
                <td className="font-bold">${totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mt-4">Proceed to Checkout</button>
          </div>
        </>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default CartPage;
