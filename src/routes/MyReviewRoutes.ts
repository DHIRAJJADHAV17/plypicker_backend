import MyReviewController from "../controller/MyReviewController";
import AccessToken from "../middleware/AccessToken";
import express from "express";
const router = express.Router();

router.get("/", AccessToken, MyReviewController.getMyReview);
router.get("/all", AccessToken, MyReviewController.getAllReview);
router.put("/", AccessToken, MyReviewController.getReviewRejected);
router.put("/accept", AccessToken, MyReviewController.getReviewAccept);
export default router;
