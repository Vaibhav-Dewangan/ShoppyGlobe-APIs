import Product from '../Models/Product.js';

export const fetchAPI = async (req, res)=>{
    try{
        //Fetch data from the external API
        const url = 'https://dummyjson.com/products';
        const response = await fetch(url);
        const data = await response.json();

        const products = data.products;

        products.forEach(async (productData)=>{
            const newProduct = new Product({
              title: productData.title,
              description: productData.description,
              category: productData.category,
              price: productData.price,
              discountPercentage: productData.discountPercentage,
              rating: productData.rating,
              stock: productData.stock,
              tags: productData.tags,
              brand: productData.brand,
              sku: productData.sku,
              weight: productData.weight,
              dimensions: productData.dimensions,
              warrantyInformation: productData.warrantyInformation,
              shippingInformation: productData.shippingInformation,
              availabilityStatus: productData.availabilityStatus,
              reviews: productData.reviews,
              returnPolicy: productData.returnPolicy,
              minimumOrderQuantity: productData.minimumOrderQuantity,
              meta: productData.meta,
              images: productData.images,
              thumbnail: productData.thumbnail,
            });

            // save
            await newProduct.save();
        });

        res.status(200).json({ message: 'Products saved to MongoDB successfully!' });

    } catch(error) {
        console.error('Error fetching or saving products:', error);
        res.status(500).json({ message: 'Server error while fetching/saving products.' });
      }
};