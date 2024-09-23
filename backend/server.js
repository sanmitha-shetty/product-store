import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config()

const app = express();

app.use(express.json()); // allows us to us json data in the req.body

app.get("/api/products", async (req,res) => {
    try {
        const products = await Product.find({}); // find({}) here {} --> find all products
        res.status(200).json({succes: true, data: products});
    } catch (error) {
        console.error("Error in Fetching Products", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.post("/api/products", async (req,res) =>{
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({succes: false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({succes: true, data: newProduct});
    } catch (error) {
        console.error("Error in Create Product", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
});

app.delete("/api/products/:id", async (req,res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product Deleted"})
    } catch (error) {
        console.error("Error in Deleting Product", error.message);
        res.status(404).json({success: false, message: "Product Not Found"})
    }
});

app.listen(5001, () => {
    connectDB();
    console.log('Server started at http://localhost:5001');
});

