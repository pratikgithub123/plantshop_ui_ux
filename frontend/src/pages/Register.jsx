import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerApi } from '../apis/Api';

const Register = () => {
  const [fullname, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [phonenum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const changeFullName = (e) => {
    setFullName(e.target.value);
  };

  const changeLocation = (e) => {
    setLocation(e.target.value);
  };

  const changePhoneNum = (e) => {
    setPhoneNum(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullname: fullname,
      location: location,
      phonenum: phonenum,
      email: email,
      password: password,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate("/login")

        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Internal Server Error!');
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '50vh', backgroundColor: '#f8f9fa' }}
    >
      <div className="w-25">
        <h1 className='m-3' style={{ color: 'black', textAlign: 'center' }}> Create an Account!</h1>
        <form>
          <label style={{ color: 'black' }}>
            FullName
          </label>
          <div className="input-group mb-2">
            <span className="input-group-text" style={{ borderColor: 'black' }}>
              <FaUser />
            </span>
            <input
              onChange={changeFullName}
              className='form-control'
              type="text"
              placeholder='Enter your Full Name'
              style={{ borderColor: 'black' }}
            />
          </div>

          <label style={{ color: 'black' }}>
             Location
          </label>
          <div className="input-group mb-2">
            <span className="input-group-text" style={{ borderColor: 'black' }}>
              <FaMapMarkerAlt />
            </span>
            <input
              onChange={changeLocation}
              className='form-control'
              type="text"
              placeholder='Enter your location'
              style={{ borderColor: 'black' }}
            />
          </div>

          <label style={{ color: 'black' }}>
            PhoneNum
          </label>
          <div className="input-group mb-2">
            <span className="input-group-text" style={{ borderColor: 'black' }}>
              <FaPhone />
            </span>
            <input
              onChange={changePhoneNum}
              className='form-control'
              type="text"
              placeholder='Enter your phone num'
              style={{ borderColor: 'black' }}
            />
          </div>

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

          <label style={{ color: 'balck' }}>
             Password</label>
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
            className='btn btn-success w-100'
            style={{ backgroundColor: 'black', color: 'white' }}
          >
            Register
          </button>
          <Link className='text-decoration-none text-black' to="/login">Already have an account? Log in</Link>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
