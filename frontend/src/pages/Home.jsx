import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { getAllProductsApi } from '../apis/Api';
import Banner from './Banner';
import './components/Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    useEffect(() => {
        // Fetch all products from the API
        getAllProductsApi().then((res) => {
            setProducts(res.data.products);
        }).catch((err) => {
            console.error('Failed to fetch products:', err);
        });
    }, []);

    const handleAddToCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = { ...prevCart };
            updatedCart[productId] = (updatedCart[productId] || 0) + 1;
            return updatedCart;
        });
    };

    // Get the first 3 products for the featured section
    const featuredProducts = products.slice(0, 3);

    // Get the remaining products for the top selling section
    const topSellingProducts = products.slice(3);

    return (
        <div>
            <Banner />
            <div className="container mt-4">
                {/* Featured Products Section */}
                <h2>Featured Products</h2>
                <div className="row">
                    {featuredProducts.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                                <div className="card">
                                    <img src={product.productImageUrl} className="card-img-top" alt={product.productName} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.productName}</h5>
                                        <p className="card-text">{product.productDescription}</p>
                                        <p className="card-text">Price: NPR {product.productPrice}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevents the card click event from triggering
                                                handleAddToCart(product._id);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Top Selling Products Section */}
                <h2>Top Selling Products</h2>
                <div className="row">
                    {topSellingProducts.map((product) => (
                        <div key={product._id} className="col-md-4 mb-4">
                            <Link to={`/product/${product._id}`} className="text-decoration-none">
                                <div className="card">
                                    <img src={product.productImageUrl} className="card-img-top" alt={product.productName} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.productName}</h5>
                                        <p className="card-text">{product.productDescription}</p>
                                        <p className="card-text">Price: NPR {product.productPrice}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevents the card click event from triggering
                                                handleAddToCart(product._id);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
