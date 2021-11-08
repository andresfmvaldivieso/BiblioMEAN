import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connection with MongoDB ok");
  } catch (error) {
      console.log("error connecting to MongoDB: \n" + error );
  }
}; 
export default { dbConnection };