import mongoose from "mongoose";


let isConnected = false; // Track the connection

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    isConnected = true;

    console.log("MONGO CONNECTED");
  } catch (error) {
    console.log("MONGO ERROR", error);
    isConnected = false;
  }
}