
# ShoppyGlobe-APIs

## Overview
Shoppy Globe is a modern e-commerce platform built with React for the frontend and Node.js with Express and MongoDB for the backend. It offers users a seamless shopping experience, including product browsing, cart management, and user authentication.

## Features

### Frontend (React)
- *Browse Products by Category*: Navigate through categories like Beauty, Furniture, Home Goods, and more.
- *Product Details*: View detailed information about products, including images, descriptions, prices, and ratings.
- *Add to Cart*: Add items to your cart for easy checkout.
- *Search Functionality*: Quickly find products using the search bar.
- *Responsive Design*: Optimized for mobile, tablet, and desktop devices.
- *Redux for State Management*: Streamlines state handling for a smooth user experience.
- *Error Handling for Invalid Routes*: Redirects to appropriate error pages for non-existent routes.

### Backend (Node.js, Express, MongoDB)
The backend API for ShoppyGlobe is built using Node.js, Express, and MongoDB, providing robust server-side functionality.

#### Key Backend Features:
1. *Node.js and Express API Setup*:
   - *GET /api/products*: Fetch a list of products from MongoDB.
   - *GET /api/products/:id*: Fetch details of a single product by its ID.
   - *POST /api/cart/add*: Add a product to the shopping cart.
   - *PUT /api/cart/update/dec/:id*: Decrease the quantity of a product in the cart.
   - *PUT /api/cart/update/inc/:id*: Increase the quantity of a product in the cart.
   - *DELETE /api/cart/remove/:id*: Remove a product from the cart.
   - *DELETE /api/cart/clear*: Clear all items from the cart.
   - *GET /api/cart*: Get all items in the cart.
   - *POST /api/fetch-products/fetch-API*: Fetch data from an external API and save to MongoDB.
   - *POST /api/auth/register*: Register a new user.
   - *POST /api/auth/login*: Log in and get a JWT token.
   - *GET /api/users*: Fetch all users.
   - *GET /api/users/:email*: Fetch user data by email.

2. *MongoDB Integration*:
   - Collections for:
     - *Products*: Contains fields like name, price, description, and stock quantity.
     - *Cart*: Stores items added to the cart, including product IDs and quantities.
   - Supports full CRUD operations for managing products and cart items.

3. *API Error Handling and Validation*:
   - Input validation and error handling for all API routes (e.g., validating product IDs before adding to the cart).

4. *Authentication & Authorization*:
   - JWT-based authentication for secure access.
   - Routes for user registration and login.
   - Cart routes are protected, accessible only to logged-in users.

5. *Testing with ThunderClient*:
   - All API routes were tested using ThunderClient to ensure proper functionality.

### Frontend Usage

#### Browsing Products
- Visit the homepage to see product categories.
- Click on any product for more details and purchase options.

#### Managing Cart
- Add products to your cart, modify quantities, or remove products.
- Clear your cart with one click if needed, and proceed to checkout.

### Redux State Management
The frontend utilizes Redux for global state management, ensuring a consistent and seamless user experience.

#### Key Redux Files:
- *cartSlice.js*: Manages cart logic like adding and removing items.
- *appStore.js*: Configures the Redux store.

### Routing (React Router)
The app employs React Router for smooth navigation between pages:
- *Home (/)*: Displays product categories.
- *Product Details (/products/:id)*: Detailed product info.
- *Cart (/cart)*: Manage items in your cart.
- *Search (/search)*: Shows search results.
- *About (/about)*: Company info.
- *404 Page*: Redirects to an error page for invalid routes.

### Conclusion
Shoppy Globe offers a simple online shopping experience, leveraging modern tools like React, Redux, Node.js, Express, and MongoDB. It features a robust backend for product and cart management, secure user authentication, and smooth frontend functionality.

The platform is built with scalability in mind and can easily be extended to include more product categories, payment options, and user management features in the future.
