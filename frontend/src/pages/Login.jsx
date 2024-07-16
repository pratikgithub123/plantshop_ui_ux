import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi } from '../apis/Api';



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    loginApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);

          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.userData));
          navigate('/home')
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Server Error!");
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '70vh',
        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div className="w-25">
        <h1 className='mb-4' style={{ color: 'black', textAlign: 'center' }}>Please Log in !</h1>
        <form>
          <label style={{ color: 'black' }}>
             Email 
          </label>
          <div className="input-group mb-2">
            <span className="input-group-text" style={{ borderColor: 'black' }}>
              <FaEnvelope />
            </span>
            <input
              onChange={changeEmail}
              className='form-control'
              type="email"
              placeholder='Enter your email'
              style={{ borderColor: 'black' }}
            />
          </div>

          <label style={{ color: 'black' }}>
             Password
          </label>
          <div className="input-group mb-2">
            <span className="input-group-text" style={{ borderColor: 'black' }}>
              <FaLock />
            </span>
            <input
              onChange={changePassword}
              className='form-control'
              type="password"
              placeholder='Enter your password'
              style={{ borderColor: 'black' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            className='btn btn-outline-success w-100'
            type='submit'
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Login
          </button>
          <Link className='text-decoration-none text-black' to="/register">Create a new account?</Link><br />
          
          
        </form>
      </div>
    </div>
  );
};

export default Login;
