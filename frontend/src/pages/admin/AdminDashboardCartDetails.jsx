import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCartApi, getAllCartsApi } from '../../apis/Api'; 

const AdminDashboardCartDetails = () => {

  const [carts, setCarts] = useState([]);

  useEffect(() => {
   
    getAllCartsApi()
      .then((res) => setCarts(res.data.carts))
      .catch((error) => {
        console.error('Error fetching carts:', error);
        toast.error('Failed to fetch carts. Please try again.');
      });
  }, []);

  
  const handleDeleteCart = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this cart?');
    if (!confirm) {
      return;
    }

    deleteCartApi(id)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setCarts(carts.filter((cart) => cart._id !== id));
        }
      })
      .catch((error) => {
        console.error('Error deleting cart:', error);
        toast.error('Failed to delete cart. Please try again.');
      });
  };

  return (
    <>
      <div className="m-5">
        <div className="d-flex justify-content-between">
          <h1>Admin Dashboard</h1>
          <Link to="/admin/dashboard" className="productdetails">
            Product Details <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
          </Link>
          <Link to="/admin/dashboarduser" className="productdetails">
            User Details <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
          </Link>
        </div>

        {/* Carts Table */}
        <div>
          <h2>Cart Details</h2>
          <table className="table">
            {/* Table Header */}
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Products</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {carts.map((cart) => (
                <tr key={cart._id}>
                  <td>{cart.user.fullname}</td>
                  <td>
                    {cart.products.map((product) => (
                      <div key={product._id}>
                        {product.productName} - Quantity: {product.quantity}
                      </div>
                    ))}
                  </td>
                  <td>{cart.totalPrice}</td>
                  <td>
                    <button onClick={() => handleDeleteCart(cart._id)} type="button" className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardCartDetails;
