import React from 'react';
import banner from '../assets/banner.png';
import './components/Banner.css';

const Banner = () => {
  return (
    <div className="banner-container">
      <img
        src={banner}
        alt="Fruit Banner"
        className="banner-image"
      />
      <div className="banner-content">
        
      </div>
    </div>
  );
};

export default Banner;
