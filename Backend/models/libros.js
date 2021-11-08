import mongoose from "mongoose";

const libroSchemas = new mongoose.Schema({
  name: String,
  author: String,
  yearPublication: Number,
  registerDate: { type: Date, default: Date.now },
  page: Number,
  gender: String,
  price: Number,
});

const libro = mongoose.model("libros", libroSchemas);
export default libro;
