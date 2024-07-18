// Navbar.js
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cart from '../assets/cart.png';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <Link to="/home">
        <img src={logo} alt="logo" className='logo' />
      </Link>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        
        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            {user.isAdmin && (
              <li className="dropdown">
                <span className="dropbtn"></span>
                <div className="dropdown-content">
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                </div>
              </li>
            )}
            <li onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </li>
            <li>
              {user.isAdmin ? (
                <span>Welcome Admin, {user.fullname}</span>
              ) : (
                <span>Welcome, {user.fullname}</span>
              )}
            </li>
          
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registration</Link>
            </li>
          </>
        )}
      </ul>
      <Link to={`/cart/${user._id}`}>
        <img src={cart} alt="cart" className='cart' />
        
      </Link>
    </div>
  );
};

export default Navbar;
