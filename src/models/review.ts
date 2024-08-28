import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: String },
  adminId: { type: String },
  productId: { type: String },
  productname: { type: String },
  price: { type: String },
  imageUrl: { type: String },
  description: { type: String },
  status: { type: String },
});

const Review = mongoose.model("review", reviewSchema);

export default Review;
