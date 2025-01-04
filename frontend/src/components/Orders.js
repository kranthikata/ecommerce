import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); // Get userId from localStorage

      if (!userId) {
        setError("You must be logged in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/orders/${userId}`); // Use the userId to fetch orders
        console.log(response);
        setOrders(response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold">Loading orders...</div>
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
          My Orders
        </h1>
        {orders.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No orders found!</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-lg shadow-md mb-6"
            >
              <h3 className="font-semibold">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </h3>
              <p className="text-sm">Total Amount: ₹{order.totalAmount}</p>
              <p className="text-sm">Status: {order.status}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Ordered Products:</h4>
                <div
                  key={order.products.productId}
                  className="flex justify-between flex-wrap py-2 items-center"
                >
                  {order.products.map((product) => (
                    <div className="flex items-center gap-4 my-1 sm:w-full md:w-[50%] xl:w-[33%]">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm">{product.name}</p>
                        <p className="text-sm">Quantity: {product.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Orders;
