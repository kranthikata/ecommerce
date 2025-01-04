const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

// Add product to cart or update quantity
router.post("/add-to-cart", cartController.addToCart);

// Get all items in the cart for a specific user
router.get("/get-cart/:userId", cartController.getCart);

// Update product quantity in the cart
router.put("/update-cart/:userId/:productId", cartController.updateCart);

// Remove product from cart
router.delete(
  "/remove-from-cart/:userId/:productId",
  cartController.removeFromCart
);

module.exports = router;
