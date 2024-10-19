import express from "express";
import { getProducts, getProductById } from "../Controllers/productController.js";

const router = express.Router();

// Route to get all products
router.get('/', getProducts);

// Route to get product by ID
router.get('/:id', getProductById);

export default router;