import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})


const config = {
    headers: {
      'authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

// configuration for axios
console.log(`Auth Header: ${localStorage.getItem('token')}`);

export const addToCartApi = (data) => Api.post('/api/cart/add', data, config);

// Register API
export const registerApi = (data) => Api.post("/api/user/create", data);

// Login API
export const loginApi = (data) => Api.post("/api/user/login", data);

// Reset Password API
export const resetPasswordApi = (data) => Api.post("/api/user/reset-password", data);

// Create Product API
export const createProductApi = (formData) => Api.post('/api/product/create_product', formData);

// Get All Products API
export const getAllProductsApi = () => Api.get('/api/product/get_products');

// Get Single Product API
export const getSingleProductApi = (id) => Api.get(`/api/product/get_product/${id}`);

// Update Product API
export const updateProductApi = (id, formData) => Api.put(`/api/product/update_product/${id}`, formData);

// Delete Product API
export const deleteProductApi = (id) => Api.delete(`/api/product/delete_product/${id}`);

// Get All Users API
export const getAllUsersApi = () => Api.get('/api/user/get_users', config)
    .then((res) => {
        console.log('Get All Users Response:', res);
        return res;
    })
    .catch((error) => {
        console.error('Get All Users Error:', error);
        throw error;
    });

// Delete User API
export const deleteUserApi = (id) => Api.delete(`/api/user/delete_user/${id}`, config);

//add to cart
export const addtoCartApi = (formData) => Api.post(`/api/cart/add`, config)


// Get All Carts API
export const getAllCartsApi = () => Api.get('/api/cart/get', config);

// Delete Cart API
export const deleteCartApi = (cartId) => Api.delete(`/api/cart/remove/${cartId}`, config);




