const mongoose = require("mongoose");

const initializeDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connection Established");
  } catch (error) {
    console.log(`DB connection failed due to: ${error.message}`);
  }
};

module.exports = initializeDBConnection;
