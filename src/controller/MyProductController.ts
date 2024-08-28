import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Product from "../models/products";

import { Request, Response } from "express";
import Review from "../models/review";

const createMyProduct = async (req: Request, res: Response) => {
  try {
    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const product = new Product(req.body);
    product.imageUrl = imageUrl;

    await product.save();
    res.status(201).json({ product: product.toObject() });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  try {
    const fileName = `images/${Date.now()}-${file.originalname}`;
    const storageRef = ref(storage, fileName);

    // Upload the file to Firebase Storage
    await uploadBytes(storageRef, file.buffer, { contentType: file.mimetype });

    // Get the download URL of the uploaded file
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw new Error("Failed to upload image to Firebase Storage");
  }
};

const getAllproduct = async (req: Request, res: Response) => {
  try {
    const restaurant = await Product.find();

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const getProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const updateMyProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const isAdmin = req.user.role; // Assuming `req.user.role` is a boolean

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (isAdmin) {
      // True if the user is an admin
      let imageUrl;

      if (req.file) {
        // If a new file is uploaded, update the image URL
        imageUrl = await uploadImage(req.file as Express.Multer.File);
        product.imageUrl = imageUrl;
      }

      // Update product details
      product.productname = req.body.productname;
      product.price = req.body.price;
      product.description = req.body.description;
      product.status = req.body.status;

      // Save the updated product to the database
      await product.save();

      // Send back the updated product
      return res.status(200).send(product);
    } else {
      // False if the user is a team member
      // Create a new review associated with the product
      const review = new Review({
        userId: req.user._id,
        productId: productId,
        productname: req.body.productname,
        price: req.body.price,
        imageUrl: req.file
          ? await uploadImage(req.file as Express.Multer.File)
          : product.imageUrl, // Use existing image URL if no new file is uploaded
        description: req.body.description,
        status: req.body.status,
        adminId: "", // Assuming the adminId field is required but not applicable here
      });

      // Save the review to the database
      await review.save();

      // Send back the new review
      return res.status(200).send(review);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    // Send back an error response if something goes wrong
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyProduct,
  getAllproduct,
  getProduct,
  updateMyProduct,
};
