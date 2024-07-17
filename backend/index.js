// importing
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const cors = require('cors');
const cloudinary = require('cloudinary');
const acceptMultimedia = require('connect-multiparty')
const Products = require('./model/productModel');
const cartRoutes = require('./routes/cartRoutes');


// Making express app
const app = express();

// dotenv config
dotenv.config();

// cloudinary config

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(acceptMultimedia())

// cors config to accept request from frontend
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};
app.use(cors(corsOptions))

// mongodb connection
connectDB();

// Accepting json data
app.use(express.json());


// user routes
app.use('/api/user', require('./routes/userRoutes'))

// Routes for cart
app.use('/api/cart', require('./routes/cartRoutes'));





// CREATE A ROUTE FOR PRODUCTS
app.use("/api/product", require("./routes/productRoutes"))






  


// defining port
const PORT = process.env.PORT;
// run the server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.get('/test', (req, res) => {
 res.send("Hello From the Server")
})


