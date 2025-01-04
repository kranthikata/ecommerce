const Product = require("../models/productModel"); // Import the Product model

// Function to handle product insertion
const insertProduct = async (req, res) => {
  try {
    const { name, image_url, price, category, stock } = req.body;

    // Check if all fields are provided
    if (!name || !image_url || !price || !category || !stock) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      image_url,
      price,
      category,
      stock,
    });

    // Save the new product to the database
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Error while adding product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to handle fetching all products
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (err) {
    console.error("Error while fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  insertProduct,
  getAllProducts,
};
