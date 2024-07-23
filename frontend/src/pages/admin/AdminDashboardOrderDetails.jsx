// // src/pages/admin/AdminDashboardOrderPage.jsx

// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { getAllOrdersApi, deleteOrderApi, updateOrderApi } from '../../apis/Api';

// const AdminDashboardOrderPage = () => {
//     const [orders, setOrders] = useState([]);
//     const [updating, setUpdating] = useState(false);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await getAllOrdersApi();
//                 if (response.data.success) {
//                     setOrders(response.data.orders);
//                 } else {
//                     toast.error('Failed to fetch orders.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching orders:', error);
//                 toast.error('Failed to fetch orders.');
//             }
//         };

//         fetchOrders();
//     }, []);

//     const handleDeleteOrder = async (id) => {
//         const confirm = window.confirm('Are you sure you want to delete this order?');
//         if (!confirm) return;

//         try {
//             const response = await deleteOrderApi(id);
//             if (response.data.success) {
//                 setOrders(orders.filter(order => order._id !== id));
//                 toast.success('Order deleted successfully.');
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             console.error('Error deleting order:', error);
//             toast.error('Failed to delete order.');
//         }
//     };

//     const handleUpdateOrder = async (id, status) => {
//         const newStatus = prompt('Enter new status:', status);
//         if (!newStatus) return;

//         setUpdating(true);
//         try {
//             const response = await updateOrderApi(id, { status: newStatus });
//             if (response.data.success) {
//                 setOrders(orders.map(order =>
//                     order._id === id ? { ...order, status: newStatus } : order
//                 ));
//                 toast.success('Order updated successfully.');
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             console.error('Error updating order:', error);
//             toast.error('Failed to update order.');
//         } finally {
//             setUpdating(false);
//         }
//     };

//     return (
//         <div>
//             <h1>Order Management</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Order ID</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map(order => (
//                         <tr key={order._id}>
//                             <td>{order._id}</td>
//                             <td>{order.status}</td>
//                             <td>
//                                 <button onClick={() => handleUpdateOrder(order._id, order.status)} disabled={updating}>
//                                     Update
//                                 </button>
//                                 <button onClick={() => handleDeleteOrder(order._id)} disabled={updating}>
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboardOrderPage;
