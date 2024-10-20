import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { jwtDecode } from 'jwt-decode';

function ProductDetails() {
  const { id } = useParams();
  const url = `http://localhost:5100/api/products/${id}`;
  const { data: updatedData, error, loading } = useFetchData(url);

  const [ItemImage, setItemImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (updatedData && updatedData.images && updatedData.images.length > 0) {
      setItemImage(updatedData.images.length > 1 ? updatedData.images[1] : updatedData.images[0]);
    }
  }, [updatedData]);

  // handle loading

  if (loading) return (

    <div className="empty-cart flex flex-col mx-auto mt-16 sm:mt-20 items-center justify-center min-h-screen text-center">
      <img
        src="/loading.gif"
        alt="loading"
        className="w-10 h-10 lg:w-14 lg:h-14 mb-4"
      />
      <p className="text-lg font-semibold text-gray-500">
        Loading...
      </p>
    </div>

  );

  // handle error

  if (error) return (
    <div className="min-h-screen " >
      <p className="lg:w-10 mx-auto my-auto ">Error loading product details.</p>
    </div>
  );

  // handle Add to cart
  const handleAddToCart = async () => {
    const Token = localStorage.getItem('token');
    let userId;

    // Decode the token to get the user ID
    if (Token) {
      const decodedToken = jwtDecode(Token);
      userId = decodedToken.userId;
    }
    const cartItem = {
      userId: userId,
      productId: updatedData._id,
      quantity: 1,
      title: updatedData.title,
      price: updatedData.price,
      stock: updatedData.stock,
      brand: updatedData.brand,
      shippingInformation: updatedData.shippingInformation,
      availabilityStatus: updatedData.availabilityStatus,
      images: ItemImage,
    };

    // Dispatch to Redux store (local cart state)
    dispatch(addItem(cartItem));

    // Send POST request to backend (API call)
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5100/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          productId: updatedData._id,
          quantity: 1,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Product added to cart");
      } else {
        console.error("Error adding to cart:", result.message);
      }
    } catch (error) {
      console.error("Network error adding to cart:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg min-h-screen mt-2">
      <div className="flex flex-col sm:flex-row lg:gap-10 sm:mt-5">
        {/* Product Image */}
        <div className="w-full sm:w-1/2 ">
          <img
            src={ItemImage}
            alt={"Product-image"}
            className="rounded-lg border object-cover w-full h-auto"
          />
        </div>

        {/* Product Details */}
        <div className="sm:ml-6 mt-6 sm:mt-0 w-full sm:w-2/3">
          <h1 className="text-2xl font-bold text-gray-800">{updatedData.title}</h1>
          <h2 className="text-xl text-gray-600 mt-2">Brand: {updatedData.brand}</h2>
          <p className="text-sm text-gray-500 italic mt-1">Category: {updatedData.category}</p>

          {/* Price and Discount */}
          <div className="mt-4 text-xl text-gray-800">
            Price: <span className="text-green-500">${updatedData.price}</span>
            <span className="text-red-500 ml-2">{updatedData.discountPercentage}% Off</span>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-row max-sm:hidden ">
            <button onClick={handleAddToCart} className="bg-slate-950 text-white p-2 pr-5 pl-5 rounded-lg hover:bg-blue-600 active:scale-95">
              Add to Cart
            </button>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-row justify-evenly items-center max-md:p-2 border-t   fixed left-0 bottom-0 right-0 bg-gray-300 h-14  lg:h-16  p-1 pt-2  w-full ">
            <Link className="  p-2 bg-white pr-5 pl-5 rounded-lg border-black max-sm:hidden " >
              Price: <span className="text-green-600 font-semibold">${updatedData.price}</span>
            </Link>
            <div className="flex flex-row lg:gap-10 sm:gap-10 gap-5">
              <button onClick={handleAddToCart} className="bg-slate-950 text-white p-2  pr-5 pl-5 rounded-lg hover:bg-blue-600 active:scale-95">
                Add to Cart
              </button>
              <Link to="/Cart" className="bg-slate-950 text-white p-2  pr-5 pl-5 rounded-lg hover:bg-blue-600 active:scale-95">
                <button>Checkout</button>
              </Link>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <span className="text-yellow-500 font-bold">{updatedData.rating}★</span>
            <span className="ml-2 text-gray-600">Stock: {updatedData.stock} (Availability: {updatedData.availabilityStatus})</span>
          </div>

          <p className="mt-4 text-gray-700 text-justify"><b>Shipping Information</b> :  {updatedData.shippingInformation}</p>

          <p className="mt-4 text-gray-700 text-justify">{updatedData.description}</p>



          {/* Reviews */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Customer Reviews:</h3>
            {updatedData.reviews.map((review, index) => (
              <div key={index} className="mt-2">
                <p className="text-sm text-gray-600">"{review.comment}"</p>
                <p className="text-xs text-gray-500">- {review.reviewerName}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;