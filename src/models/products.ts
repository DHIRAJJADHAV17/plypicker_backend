import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productname: { type: String },
  price: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String },
});

const Product = mongoose.model("product", productSchema);

export default Product;
