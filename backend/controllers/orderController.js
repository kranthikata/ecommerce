const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Insert order data
const insertOrderData = async (req, res) => {
  try {
    const { userId, products } = req.body;

    if (!userId || !products || !products.length) {
      return res
        .status(400)
        .json({ error: "User ID and products are required" });
    }

    // Calculate total amount and populate product details
    let totalAmount = 0;
    const populatedProducts = await Promise.all(
      products.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }
        totalAmount += product.price * quantity;
        return {
          productId,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          quantity,
        };
      })
    );

    // Create a new order
    const newOrder = new Order({
      userId,
      products: populatedProducts,
      totalAmount,
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Error while inserting order data:", err.message);
    res.status(500).json({ error: "Failed to place order" });
  }
};

// Get order details for a user
const getOrderDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const orders = await Order.find({ userId });

    // if (!orders.length) {
    //   return res.status(404).json({ message: "No orders found!!" });
    // }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (err) {
    console.error("Error while fetching order details:", err.message);
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};

module.exports = {
  insertOrderData,
  getOrderDetails,
};
