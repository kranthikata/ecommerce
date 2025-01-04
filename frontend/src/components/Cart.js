import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify"; // Import toast from react-toastify

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Fetch userId from localStorage

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const response = await api.get(`/cart/get-cart/${userId}`);
      console.log(response);
      setCart(response.data.cart.products); // Update local cart state with fetched cart items
    } catch (error) {
      console.error("Error fetching cart items:", error);
      toast.error("Failed to load cart items.");
    }
  };

  // Calculate total price by multiplying price and quantity for each item
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!userId) {
      toast.error("You must be logged in to place an order."); // Replace alert with toast
      return;
    }

    try {
      const products = cart.map((item) => ({
        productId: item.product._id, // Use the product _id for the order
        quantity: item.quantity,
      }));

      const response = await api.post("/orders", {
        userId: userId, // Use the actual logged-in userId
        products,
      });

      toast.success("Order placed successfully!"); // Success toast
      setCart([]); // Clear the cart
      navigate("/orders"); // Redirect to orders page
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again."); // Error toast
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    const currentProduct = cart.find((item) => item.product._id === productId); // Find the product in the cart
    if (!currentProduct) {
      toast.error("Product not found in the cart.");
      return;
    }

    const newQuantity = currentProduct.quantity + 1; // Increase the quantity by 1

    try {
      const response = await api.put(
        `/cart/update-cart/${userId}/${productId}`,
        {
          quantity: newQuantity, // Send the updated quantity to the backend
        }
      );

      if (response.status === 200) {
        fetchCart(); // Fetch the updated cart from backend
      } else {
        toast.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    }
  };

  const handleDecreaseQuantity = async (productId) => {
    const currentProduct = cart.find((item) => item.product._id === productId); // Find the product in the cart
    if (!currentProduct) {
      toast.error("Product not found in the cart.");
      return;
    }

    if (currentProduct.quantity === 1) {
      return;
    }

    const newQuantity = currentProduct.quantity - 1; // Increase the quantity by 1

    try {
      const response = await api.put(
        `/cart/update-cart/${userId}/${productId}`,
        {
          quantity: newQuantity, // Send the updated quantity to the backend
        }
      );

      console.log(response);

      if (response.status === 200) {
        fetchCart(); // Fetch the updated cart from backend
      } else {
        toast.error("Failed to update quantity.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity.");
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const response = await api.delete(
        `/cart/remove-from-cart/${userId}/${productId}`
      );
      console.log(response);
      toast.success("Product removed from cart.");
      fetchCart(); // Fetch the updated cart from backend
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
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
        </div>
      </nav>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Your Cart
        </h1>
        {cart.length === 0 ? (
          <div className="flex justify-center items-center h-[80vh]">
            <p className="text-center text-3xl text-gray-600">
              Your cart is empty!
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="p-4 bg-white mb-4 rounded-lg shadow-md"
                >
                  {/* Product Image and Details */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-5 w-[50%]">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <h3 className="text-lg font-semibold truncate">
                        {item.product.name}
                      </h3>
                    </div>

                    <div className="w-[50%] flex justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(item.product._id)
                          }
                          className="bg-gray-300 text-gray-800 h-5 w-5 flex items-center justify-center rounded-md"
                        >
                          -
                        </button>
                        <p className="mx-4 text-gray-700">{item.quantity}</p>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(item.product._id)
                          }
                          className="bg-gray-300 text-gray-800 h-5 w-5 flex items-center justify-center rounded-md"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-20">
                        <p className="text-md text-gray-600">
                          ₹{item.product.price * item.quantity}{" "}
                          {/* Display price based on quantity */}
                        </p>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="text-red-500 text-lg"
                        >
                          <FaTrashAlt size={25} /> {/* Trash Icon */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-right mb-6">
              Total: ₹{totalAmount}
            </h2>
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
