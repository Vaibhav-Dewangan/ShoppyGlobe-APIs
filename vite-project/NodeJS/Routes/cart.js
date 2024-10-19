import express from "express";
import verifyJWT from "../Middleware/verifyJWT.js";
import { addToCart, removeFromCart, clearCart, getCartItems, updateCartMinus, updateCartPlus } from "../Controllers/cartController.js";

const router = express.Router();

// Apply verifyJWT middleware to all cart routes
router.use(verifyJWT);

// Route to add a product to the cart
router.post('/add', addToCart);

// Route to Update the quantity (handleMinus '-') of a product in the cart.
router.patch('/update/dec/:id' , updateCartMinus);

// Route to Update the quantity (handlePlus '+') of a product in the cart.
router.patch('/update/inc/:id' , updateCartPlus);

// Route to remove a product from the cart
router.delete('/remove/:id' , removeFromCart);

// Route to clear the cart
router.delete('/clear', clearCart);

// Route to get all cart items
router.get('/', getCartItems);

export default router;