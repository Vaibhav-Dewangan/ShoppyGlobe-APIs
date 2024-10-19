import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title : { type: String },
    description : { type: String },
    category : { type: String },
    price : { type: String },
    discountPercentage : { type: Number },
    rating : { type: Number },
    stock : { type: String },
    tags : { type: Array},
    brand : { type: String },
    sku : { type: String },
    weight : { type: Number },
    dimensions : { type: Array},
    warrantyInformation : { type: String },
    shippingInformation : { type: String },
    availabilityStatus : { type: String },
    reviews : { type: Array},
    returnPolicy : { type: String },
    minimumOrderQuantity : { type: Number },
    meta : { type: Object },
    images : { type: Array},
    thumbnail : { type: Array},

});

const Product = mongoose.model('Product', productSchema);

export default Product;