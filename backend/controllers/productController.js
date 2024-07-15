const cloudinary = require('cloudinary');
const Products = require('../model/productModel');

// to a create a product
const createProduct = async (req, res) => {
    // Step 1: Check incoming data
    console.log(req.body);
    console.log(req.files);

    // Step 2: Destructuring data
    const {
        productName,
        productPrice,
        productDescription,
        productCategory,
        productFeatured,
    } = req.body;
    const { productImage } = req.files;

    // Step 3: Validate data
    if (!productName || !productPrice || !productDescription || !productCategory || !productImage ||!productFeatured) {
        return res.json({
            success: false,
            message: 'Please fill all the fields',
        });
    }

    try {
        // Upload images to cloudinary
        const uploadedImage = await cloudinary.v2.uploader.upload(
            productImage.path,
            {
                folder: 'products',
                crop: 'scale',
            }
        );

        
        const newProduct = new Products({
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productCategory: productCategory,
            productfeatured: productFeatured,
            productImageUrl: uploadedImage.secure_url,
            
        });
        await newProduct.save();
        res.json({
            success: true,
            message: 'Product created successfully',
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};


const getProducts = async (req, res) => {
    try {
        const allProducts = await Products.find({});
        res.json({
            success: true,
            message: 'All products fetched successfully!',
            products: allProducts,
        });
    } catch (error) {
        console.log(error);
        res.send('Internal server error');
    }
};


const getSingleProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const singleProduct = await Products.findById(productId);
        res.json({
            success: true,
            message: 'Single product fetched successfully!',
            product: singleProduct,
        });
    } catch (error) {
        console.log(error);
        res.send('Internal server error');
    }
};


const updateProduct = async (req, res) => {
   
    console.log(req.body);
    console.log(req.files);


    const {
        productName,
        productPrice,
        productDescription,
        productCategory,
        productFeatured,
    } = req.body;
    const { productImage } = req.files;

    
    if (!productName || !productPrice || !productDescription || !productCategory || !productFeatured) {
        return res.json({
            success: false,
            message: 'Required fields are missing!',
        });
    }

    try {
        
        if (productImage) {
          
            const uploadedImage = await cloudinary.v2.uploader.upload(
                productImage.path,
                {
                    folder: 'products',
                    crop: 'scale',
                }
            );

            
            const updatedData = {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                productCategory: productCategory,
                productImageUrl: uploadedImage.secure_url,
                productFeatured: productFeatured,
            };

            
            const productId = req.params.id;
            await Products.findByIdAndUpdate(productId, updatedData);
            res.json({
                success: true,
                message: 'Product updated successfully with Image!',
                updatedProduct: updatedData,
            });
        } else {
            
            const updatedData = {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                productCategory: productCategory,
                productFeatured: productFeatured,

            };

            
            const productId = req.params.id;
            await Products.findByIdAndUpdate(productId, updatedData);
            res.json({
                success: true,
                message: 'Product updated successfully without Image!',
                updatedProduct: updatedData,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        await Products.findByIdAndDelete(productId);
        res.json({
            success: true,
            message: 'Product deleted successfully!',
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Server error!!',
        });
    }
};
const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await Products.find({ featured: true });

        res.json({
            success: true,
            message: 'Featured products fetched successfully!',
            products: featuredProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};





// Search products
const searchProducts = async (req, res) => {
    const { query } = req.query;

    try {
        const searchResults = await Products.find({
            $or: [
                { productName: { $regex: new RegExp(query, 'i') } },
                { productDescription: { $regex: new RegExp(query, 'i') } },
            ],
        });

        res.json({
            success: true,
            message: 'Search results fetched successfully!',
            results: searchResults,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getFeaturedProducts,
    
};
