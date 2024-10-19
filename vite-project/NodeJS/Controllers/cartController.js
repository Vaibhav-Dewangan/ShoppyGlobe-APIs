import Cart from "../Models/Cart.js";
import Product from "../Models/Product.js";

// GET /Cart: get all product from cart;
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract userId from JWT
        const cartItems = await Cart.find({ userId }) .populate('productId', 'productId title price stock brand shippingInformation images availabilityStatus'); // Fetch items with product details
        res.status(200).json(cartItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// POST /cart: Add a product to the shopping cart.
export const addToCart = async (req, res) => {
    try {
        
        const { productId, quantity } = req.body;
        const userId = req.user.userId; // Get userId from JWT

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Find existing cart item for the user and product
        let cartItem = await Cart.findOne({ userId, productId });
        
        if (cartItem) {
            // Update quantity
            cartItem.quantity += quantity;
        } else {
            // Create a new cart item
            cartItem = new Cart({ 
                userId,
                productId,
                quantity,
                title: product.title,
                price: product.price,
                stock: product.stock,
                brand: product.brand,
                shippingInformation: product.shippingInformation,
                availabilityStatus: product.availabilityStatus,
                images: product.images,
            });
        }

        await cartItem.save();
        res.status(201).json(cartItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// PATCH /cart: Update the quantity (handlePlus '+') of a product in the cart.
export const updateCartPlus = async (req, res) => {
    try {
        const id = req.params.id;

        // Find cart item by userId and productId
        const cartItem = await Cart.findById(id);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        // Update quantity
        cartItem.quantity += 1;
        await cartItem.save();

        res.status(200).json(cartItem);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// PATCH /cart: Update the quantity (handleMinus '-') of a product in the cart.
export const updateCartMinus = async (req, res) => {
    try {
        const id = req.params.id;

        // Find cart item by userId and productId
        const cartItem = await Cart.findById(id);
        if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

        // Update quantity
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            await cartItem.save();
            res.status(200).json(cartItem);
        } else {
            res.status(400).json({ message: "Quantity cannot be less than 1" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /cart: Remove a product from the cart.
export const removeFromCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user.userId; // Get userId from JWT

        const cartItem = await Cart.findOneAndDelete(productId);
        if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });

        res.status(200).json({ message: 'Item removed from cart' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /cart/clear: Clear products from the cart.
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.userId; // Get userId from JWT

        await Cart.deleteMany({ userId });
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "Failed to clear cart" });
    }
};