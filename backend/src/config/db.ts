import mongoose from "mongoose";
import { MONGODB_URI } from "../constants/env";

const connectToDatabase = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(MONGODB_URI, options);

    const dbName = mongoose.connection.name;
    console.log(`[${new Date().toISOString()}] MongoDB Connected:`);
    console.log(`  • Database: ${dbName}`);
    console.log(`  • Host: ${mongoose.connection.host}`);
    console.log(`  • Port: ${mongoose.connection.port}`);
  } catch (error) {
    console.log(`[${new Date().toISOString()}] MongoDB Connection Error:`);
    process.exit(1);
  }
};

export default connectToDatabase;
