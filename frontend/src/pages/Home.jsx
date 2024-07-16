import React, { useEffect, useState } from 'react';
import { getAllProductsApi } from '../apis/Api';
import Banner from './Banner';
import './components/Home.css';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        
        getAllProductsApi().then((res) => {
            
            const featured = res.data.products.filter((product) => product.featured);
            setFeaturedProducts(featured);
        });
    }, []);

    const handleAddToCart = (productId) => {
        
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[productId] = (updatedCart[productId] || 0) + 1;
            return updatedCart;
        });

        
    };

    return (
        <div>
            <Banner />
            <div className="container mt-4">
                <h2>Featured Products</h2>
                <div className="row">
                    {featuredProducts.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={product.productImageUrl} className="card-img-top" alt={product.productName} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.productName}</h5>
                                    <p className="card-text">{product.productDescription}</p>
                                    <p className="card-text">Price: NPR {product.productPrice}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddToCart(product._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
