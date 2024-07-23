import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const getConfig = () => ({
    headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
    }
});

// Log the auth header for debugging purposes
console.log(`Auth Header: ${localStorage.getItem('token')}`);

export const addToCartApi = (data) => Api.post('/api/cart/add', data, getConfig());

// Register API
export const registerApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginApi = (data) => Api.post("/api/user/login", data);

// Reset Password API
export const resetPasswordApi = (data) => Api.post("/api/user/reset-password", data);

// Create Product API
export const createProductApi = (formData) => {
    return axios.post('http://localhost:5000/api/product/create_product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// Get All Products API
export const getAllProductsApi = () => Api.get('/api/product/get_products');

// Get Single Product API
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`);

// Update Product API
export const updateProductApi = (id, formData) => {
    return axios.put(`http://localhost:5000/api/product/update_product/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};


// Delete Product API
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`);

// Get All Users API
export const getAllUsersApi = () => Api.get('/api/user/get_users', getConfig())
    .then((res) => {
        console.log('Get All Users Response:', res);
        return res;
    })
    .catch((error) => {
        console.error('Get All Users Error:', error);
        throw error;
    });

// Delete User API
export const deleteUserApi = (id) => Api.delete(`/api/user/delete_user/${id}`, getConfig());

// Get All Carts API
export const getAllCartsApi = (id) => Api.get(`/api/cart/getcart/${id}`, getConfig());

// Add to Carts API
export const addtoCartsApi = (formData) => {
    console.log("Payload:", formData);
    console.log("Config:", getConfig());
    return Api.post(`/api/cart/add`, formData, getConfig());
};



// Delete Cart API
export const deleteCartApi = (formData) => Api.delete(`/api/cart/delete`, { data: formData, ...getConfig() });

// Clear Cart API
export const clearCartApi = (userId) => Api.post('/api/cart/clear', { userId }, getConfig());

// Update Cart API
export const updateCartApi = (formData) => {
    console.log("Update Payload:", formData);
    console.log("Update Config:", getConfig());
    return Api.put(`/api/cart/update`, formData, getConfig());
};

export const checkoutApi = async (userId) => {
    try {
        console.log(`Posting to: /api/cart/checkout with userId: ${userId}`);
        const response = await Api.post('/api/cart/checkout', { userId });
        return response.data;
    } catch (error) {
        console.error('Error during checkout:', error);
        throw error;
    }
};

export const getCart = (userId) => {
    return Api.get(`/api/cart/getcart/${userId}`)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching cart:', error);
        throw error;
      });
  };