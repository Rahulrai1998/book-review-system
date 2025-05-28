import express, { Router } from "express";
import {
  getBook,
  addBook,
  deleteBook,
  getAllBooks,
  getBooksByFilter,
} from "../controllers/booksController.js";
import {
  addReview,
  updateReview,
  deleteReview,
  getReviewsForBook,
} from "../controllers/reviewController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const bookRouter = Router();

// Apply JWT middleware
bookRouter.use(validateToken);

// GET /search must be declared BEFORE /:id
bookRouter.route("/search").get(getBooksByFilter);

// Book routes
bookRouter.route("/").get(getAllBooks).post(addBook);
bookRouter.route("/:id").get(getBook).delete(deleteBook)

// Review routes
bookRouter.route("/:id/reviews").get(getReviewsForBook).post(addReview);
bookRouter.route("/reviews/:id").put(updateReview).delete(deleteReview);

export default bookRouter;
