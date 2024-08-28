import { Request, Response } from "express";
import Review from "../models/review";
import Product from "../models/products";

const getMyReview = async (req: Request, res: Response) => {
  try {
    // console.log(req.user._id.toString());

    const data = await Review.find({ userId: req.user._id.toString() });
    if (!data) {
      return res.status(404).json({ message: "review not found" });
    }

    res.json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching review" });
  }
};
const getAllReview = async (req: Request, res: Response) => {
  try {
    // console.log(req.user._id.toString());

    const data = await Review.find();
    if (!data) {
      return res.status(404).json({ message: "review not found" });
    }

    res.json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching review" });
  }
};
const getReviewRejected = async (req: Request, res: Response) => {
  try {
    const data = await Review.findById(req.body.id);
    if (!data) {
      return res.status(404).json({ message: "review not found" });
    }
    data.status = "rejected";

    await data.save();
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching review" });
  }
};
const getReviewAccept = async (req: Request, res: Response) => {
  try {
    // Fetch review by ID
    const data = await Review.findById(req.body.id);
    if (!data) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Fetch the associated product by its ID
    const product = await Product.findById(data.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.productname = data.productname;
    product.price = data.price!;
    product.description = data.description!;
    product.imageUrl = data.imageUrl!;
    product.status = "active";

    // Update review status
    data.status = "accepted";

    // Save the updated product and review
    await product.save();
    await data.save();

    // Send success response
    res.status(200).json({
      message: "Review accepted and product updated successfully",
      review: data,
      product,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching review" });
  }
};

export default {
  getMyReview,
  getReviewRejected,
  getReviewAccept,
  getAllReview,
};
