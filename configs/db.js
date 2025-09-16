const mongoose = require("mongoose");

export const connectToDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db successfully");
  } catch (error) {
    console.log(`Db connection has error => ${error}`);
  }
};
