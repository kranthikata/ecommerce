const express = require("express");
const {
  insertProduct,
  getAllProducts,
} = require("../controllers/productController"); // Import controller functions

const router = express.Router();

// Route to insert product
router.route("/").post(insertProduct).get(getAllProducts);

module.exports = router;
