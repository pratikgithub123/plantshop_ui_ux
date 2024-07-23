import React, { useEffect, useState } from 'react';
import { getOrderApi, updateOrderApi, deleteOrderApi } from '../apis/Api';

const OrderPage = ({ orderId }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderApi(orderId);
        setOrder(response.data.order);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleUpdate = async () => {
    const updates = { /* Your updates here */ };
    try {
      const response = await updateOrderApi(orderId, updates);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrderApi(orderId);
        // Handle post-delete logic (e.g., redirect or update UI)
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {order ? (
        <div>
          <h1>Order Details</h1>
          <p>Total Price: {order.totalPrice}</p>
          {/* Render more details about the order */}
          <button onClick={handleUpdate}>Update Order</button>
          <button onClick={handleDelete}>Delete Order</button>
        </div>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default OrderPage;
