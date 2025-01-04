const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const initializeDBConnection = require("./libs/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
initializeDBConnection();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
