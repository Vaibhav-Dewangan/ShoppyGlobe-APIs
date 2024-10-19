import Product from "../Models/Product.js";

// GET /products: Fetch a list of products from MongoDB.
export const getProducts = async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
};

// GET /products/: Fetch details of a single product by its ID.
export const getProductById = async (req, res)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
};




