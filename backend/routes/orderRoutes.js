const express = require("express");
const router = express.Router();
const {
  insertOrderData,
  getOrderDetails,
} = require("../controllers/orderController");

// POST /api/orders - Insert an order
router.post("/", insertOrderData);

// GET /api/orders/:userId - Get orders for a specific user
router.get("/:userId", getOrderDetails);

module.exports = router;
