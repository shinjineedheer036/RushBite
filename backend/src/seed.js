require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const seedDatabase = require("./data/seed");

const runSeed = async () => {
  try {
    await connectDB();
    await seedDatabase();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

runSeed();