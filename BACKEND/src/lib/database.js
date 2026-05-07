import mongoose from "mongoose"; // Import the mongoose library for MongoDB interactions

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);//TO ACCESS URL OF MONGODB FROM .env FILE
    console.log(`MongoDB Connected: ${connect.connection.host}`);//CONNECTION HOST NAME
  } catch (error) {
    console.log("Error in connecting to MongoDB:",error);
    process.exit(1); // Exit the process with an error code
  }
};

