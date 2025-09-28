const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/zapzo");
    console.log(" Connection successful with zapzo");
  } catch (error) {
    console.error(" Error occurred while connecting database:", error);
  }
}

module.exports = connectDB;
