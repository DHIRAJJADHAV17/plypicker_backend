import express from "express";
import MyProductController from "../controller/MyProductController";
import { param } from "express-validator";
const router = express.Router();
import multer from "multer";
import AccessToken from "../middleware/AccessToken";
const upload = multer();

router.post("/", upload.single("file"), MyProductController.createMyProduct);
router.get("/", MyProductController.getAllproduct);
router.get(
  "/detail/:productId",
  param("productId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramenter must be a valid string"),
  MyProductController.getProduct
);
router.put(
  "/detail/:productId",
  upload.single("imageFile"),
  AccessToken,
  param("productId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("ProductId parameter must be a valid string"),
  AccessToken,
  MyProductController.updateMyProduct
);
export default router;
