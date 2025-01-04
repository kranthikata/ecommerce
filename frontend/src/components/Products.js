import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import api from "../api"; // Import your Axios instance
import { toast } from "react-toastify"; // Import only the toast function

const Products = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  // const handleAddToCart = (product) => {
  //   const userId = localStorage.getItem("userId"); // Get userId
  //   if (!userId) {
  //     toast.error("Please log in to add items to your cart.");
  //     navigate("/login");
  //     return;
  //   }

  //   setCart((prevCart) => {
  //     const existing = prevCart.find((item) => item._id === product._id);
  //     if (existing) {
  //       return prevCart.map((item) =>
  //         item._id === product._id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prevCart, { ...product, quantity: 1 }];
  //   });

  //   // Show success toast
  //   toast.success(`${product.name} added to cart!`, {
  //     autoClose: 3000, // Toast auto closes after 3 seconds
  //   });
  // };
  const handleAddToCart = async (product) => {
    const userId = localStorage.getItem("userId"); // Get userId
    if (!userId) {
      toast.error("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }

    try {
      // Make an API call to add the product to the cart in the backend
      const response = await api.post("/cart/add-to-cart", {
        userId: userId,
        productId: product._id, // Send the product ID
        quantity: 1, // Add 1 item to the cart
      });

      // Check the response and update the cart state
      if (response.status === 200) {
        // If the cart is updated successfully in the backend, update the local cart state
        setCart((prevCart) => {
          const existing = prevCart.find((item) => item._id === product._id);
          if (existing) {
            return prevCart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...response.data.products];
        });

        // Show success toast
        toast.success(`${product.name} added to cart!`, {
          autoClose: 1000, // Toast auto closes after 3 seconds
        });
      } else {
        // Handle failure (if the backend did not successfully update the cart)
        toast.error("Failed to add product to cart. Please try again.");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-cyan-300 px-4 py-2 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">Shop Karo</div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Products
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            My Orders
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            View Cart
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Product Catalog */}
      <div className="p-6 background-gradient">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-100">
          Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden p-3 flex flex-col items-center justify-center"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-64 h-64 rounded-md"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  Category: {product.category}
                </p>
                <p className="text-gray-800 font-semibold">₹{product.price}</p>
                <p
                  className={`text-sm ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                {product.stock > 0 && (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
