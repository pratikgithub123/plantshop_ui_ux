import React, { useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import './App.css';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import CartPage from './pages/CartPage';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import Profile from './pages/Profile';
import Register from './pages/Register';



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';



import { CartProvider } from './pages/CartContext';
import ProductDetails from './pages/ProductsDetails';
import ResetPassword from './pages/ResetPassword';
import AdminDashboardUserDetails from './pages/admin/AdminDasboardUserDetails';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDashboardCartDetails from './pages/admin/AdminDashboardCartDetails';
import AdminEditProduct from './pages/admin/AdminEditProduct';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    
    <CartProvider>
    <Router>
      <Navbar setSearchQuery={setSearchQuery}searchQuery={searchQuery} />
      
     
      <ToastContainer />
      <div className='main'>

      <Routes>
      <Route path="/products" element={<ProductsPage searchQuery={searchQuery} />} />
      <Route path="/product/:id" element={<ProductDetails />} />
        
        <Route path='/home' element={<Home />} />
        <Route path='/products' element={<ProductsPage />} />
       <Route path="/cart" component={CartPage} />
        
      
        
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        
       

        <Route element={<UserRoutes/>}>
        <Route path='/profile' element={<Profile/>} />
        </Route>


        <Route element={<AdminRoutes />} >
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/dashboarduser' element={<AdminDashboardUserDetails />} />
          <Route path='/admin/dashboardcart' element={<AdminDashboardCartDetails />} />
          <Route path='/admin/edit/:id' element={<AdminEditProduct />} />
        </Route>

      </Routes>
      </div>

      <Footer></Footer>

    </Router>
    </CartProvider>
  );
}

export default App;
