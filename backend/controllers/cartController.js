const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Helper function to check if the user exists
const checkUserExistence = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
};

// Add product to cart or update quantity
const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Check if the user exists
    await checkUserExistence(userId);

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      // Update the quantity if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId.toString()
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res
      .status(200)
      .json({ message: "Cart updated successfully!", products: cart.products });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get all items in the cart for a specific user
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists
    await checkUserExistence(userId);

    // Try to fetch the cart
    let cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [],
      });
      await cart.save();
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error retrieving cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update product quantity in the cart
const updateCart = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    // Check if the user exists
    await checkUserExistence(userId);

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Find the product in the cart and update the quantity
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Cart updated successfully!" });
    } else {
      res.status(404).json({ message: "Product not found in cart." });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Check if the user exists
    await checkUserExistence(userId);

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (item) => item._id.toString() !== productId.toString()
    );

    await cart.save();
    res.status(200).json({ message: "Product removed from cart." });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};
