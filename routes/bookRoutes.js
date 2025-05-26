import express, { Router } from "express";
import {
  getBook,
  getBooks,
  addBook,
  deleteBook,
  getBooksByFilter,
} from "../controllers/booksController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const bookRouter = Router();
bookRouter.use(validateToken);
bookRouter.route("/").get(getBooks).post(addBook);
bookRouter.route("/:id").get(getBook).delete(deleteBook);
bookRouter.route("/search").get(getBooksByFilter);

export default bookRouter;
