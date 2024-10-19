import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    productId: {
         type: mongoose.Schema.Types.ObjectId,
         ref:'Product',
         required: true},
    quantity: {
        type: Number,
        required: true,
        default: 1},

  
},{ timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;