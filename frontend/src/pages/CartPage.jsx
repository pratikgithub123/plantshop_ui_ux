import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCartApi, deleteCartApi, getAllCartsApi, updateCartApi } from '../apis/Api'; // Import updateCartApi

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // For update state
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
        toast.success("Item Deleted From Cart");
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

  // New function to handle clearing the cart
  const handleClearCartApi = async () => {
    if (window.confirm("Are you sure you want to clear the entire cart?")) {
      try {
        const response = await clearCartApi(id);
        console.log('Clear Cart API Response:', response);
        if (response.data.success) {
          setCartItems([]);
          toast.success("All items removed from cart");
        } else {
          console.error('Error clearing cart:', response.data.message);
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  // New function to handle updating cart items
  const handleUpdateQuantity = async (productId, newQuantity) => {
    setUpdating(true);
    try {
      const formData = {
        userId: id,
        productId: productId,
        quantity: newQuantity
      };
      const response = await updateCartApi(formData);
      console.log('Update Cart API Response:', response);
      if (response.data.success) {
        setCartItems(cartItems.map(item =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        ));
        toast.success("Cart updated successfully");
      } else {
        console.error('Error updating cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Calculate total price for each item and overall total
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.product.productPrice * item.quantity);
  }, 0).toFixed(2);

  return (
    <div className="m-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button onClick={handleClearCartApi} className="btn btn-danger">Clear Cart</button>
      </div>
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
                <th>Item Total</th> {/* New column for item total */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const itemTotal = (item.product.productPrice * item.quantity).toFixed(2); // Calculate item total
                return (
                  <tr key={item.product._id}>
                    <td>
                      <img src={item.product.productImageUrl} alt={item.product.productName} className="product-image" style={{ width: '100px', height: 'auto' }} />
                    </td>
                    <td>{item.product.productName}</td>
                    <td>NPR {item.product.productPrice.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.product._id, Number(e.target.value))}
                        disabled={updating}
                        style={{ width: '60px' }} // Make the quantity box smaller
                      />
                    </td>
                    <td>NPR {itemTotal}</td> {/* Display item total */}
                    <td>
                      <button onClick={() => confirmAndDelete(item.product._id)} type="button" className="btn btn-danger">
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4"></td>
                <td className="font-bold">Grand Total:</td>
                <td className="font-bold">NPR : {totalPrice}</td>
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
