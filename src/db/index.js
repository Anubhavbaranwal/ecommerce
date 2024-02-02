import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.URL}/ecomme`);

    console.log(`mongodb connect to ${connect.connection.host}`);
  } catch (error) {
    console.log("Mogodb connection failed please try", error);
    process.exit(1);
  }
};

export default ConnectDB;
