import asyncHandler from "express-async-handler";
import { BookSchemaModel } from "../models/bookModel.js";
import { ReviewSchemaModel } from "../models/reviewModel.js";

//@description: get all books
//@route: GET /api/books
//@access: private
export const getAllBooks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default: page 1
  const limit = parseInt(req.query.limit) || 10; // Default: 10 books per page
  const skip = (page - 1) * limit;

  const totalBooks = await BookSchemaModel.countDocuments();
  const books = await BookSchemaModel.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // optional: newest books first

  res.status(200).json({
    page,
    limit,
    totalBooks,
    totalPages: Math.ceil(totalBooks / limit),
    books,
  });
});

//@description: get all books by author or title filter
//@route: GET /api/books
//@access: private
export const getBooksByFilter = asyncHandler(async (req, res) => {
  const { author, title, page = 1, limit = 10 } = req.body;
  const skip = (page - 1) * limit;

  const filter = {};

  if (author) {
    filter.author = { $regex: new RegExp(author, "i") };
  }

  if (title) {
    filter.title = { $regex: new RegExp(title, "i") };
  }

  const [books, totalBooks] = await Promise.all([
    BookSchemaModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    BookSchemaModel.countDocuments(filter),
  ]);

  res.status(200).json({
    page,
    limit,
    totalBooks,
    totalPages: Math.ceil(totalBooks / limit),
    books,
  });
});

//@description: create new book
//@route: POST /api/books
//@access: private
export const addBook = asyncHandler(async (req, res) => {
  const { title, author, description, genre } = req.body;
  if (!title || !author || !description || !genre) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const book = await BookSchemaModel.create({
    title,
    author,
    description,
    genre,
    user_id: req.user.id,
  });
  res.status(201).json(book);
});

//@description: get book
//@route: GET /api/books/:id
//@access: private
export const getBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  const book = await BookSchemaModel.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error("Book not found!");
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const reviews = await ReviewSchemaModel.find({ book: bookId })
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalReviews = await ReviewSchemaModel.countDocuments({ book: bookId });

  res.status(200).json({
    book,
    averageRating: book.averageRating ?? 0,
    reviews: {
      // page,
      // limit,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      items: reviews,
    },
  });
});

//@description: delete book
//@route: DELETE /api/books/:id
//@access: private
export const deleteBook = asyncHandler(async (req, res) => {
  const book = await BookSchemaModel.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }

  if (book.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("UNAUTHORIZED ACCESS!!");
  }
  await BookSchemaModel.deleteOne({ _id: req.params.id });
  res.status(200).json(book);
});
