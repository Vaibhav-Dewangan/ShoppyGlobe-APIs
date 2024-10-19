import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRoutes from "./Routes/products.js";
import cartRoutes from "./Routes/cart.js";
import authRoutes from "./Routes/auth.js";
import fetchProductRoutes from "./Routes/fetch.js";
import userRoutes from "./Routes/userRoutes.js";

mongoose.connect("mongodb://localhost:27017/ShoppyGlobe");
const db = mongoose.connection;

db.on("open", ()=>{
    console.log("Connection succesfull");
});

db.on("error", (err)=>{
    console.log("MongoDB connection error :", err);
});

const app = express();
const PORT = 5100;

// Middleware to parse JSON
app.use(express.json());

//Enable CORS
app.use(cors({ origin: '*' }));


// Use Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/fetch-products', fetchProductRoutes);
app.use('/users', userRoutes);

// Logging Middleware
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})

// Error Handeling middleware for catching unknown routes
app.use((req, res)=>{
    res.status(404).json({message:"Route not found"});
});

// Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

