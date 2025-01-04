# E-Commerce Website

This is a full-fledged e-commerce web application where users can browse products, add them to their cart, place orders, and view order history. The application includes authentication features such as login, signup, password reset, and secure access to user-specific pages like the cart and orders.

## Features

- **User Authentication**: Users can sign up, log in, and reset their password.
- **Product Browsing**: View a list of products with images, descriptions, and prices.
- **Cart**: Add products to the cart, view cart items, and increase/decrease item quantities.
- **Order History**: View past orders, including order date and the products purchased.
- **Responsive Design**: The application is fully responsive and optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Toast Notifications**: react-toastify for user feedback
- **Routing**: React Router v6
- **API Requests**: Axios (via custom `api.js`)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kranthikata/ecommerce.git
   cd ecommerce
   ```

2. Navigate to backend directory and install all dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create .env file with data like:

   ```bash
   PORT=5000
   JWT_SECRET=<Your_own_secret>
   MONGODB_URI=<Your_mongodb_uri>
   EMAIL_PASS=<Your_email_pass>
   EMAIL_USER=<Your_email>
   ```

4. Start backend server:

   ```bash
   npm run dev
   ```

5. Navigate to frontend and install all dependencies:

   ```bash
   cd ..
   cd frontend
   npm install
   ```

6. Start frontend development server:

   ```bash
   npm start
   ```
