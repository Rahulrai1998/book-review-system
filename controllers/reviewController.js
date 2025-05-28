import { ReviewSchemaModel } from "../models/reviewModel.js";
import { BookSchemaModel } from "../models/bookModel.js";
import mongoose from "mongoose";

export const getReviewsForBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const book = await BookSchemaModel.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const reviews = await ReviewSchemaModel.find({ book: bookId })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await ReviewSchemaModel.countDocuments({
      book: bookId,
    });

    res.status(200).json({
      page,
      limit,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limit),
      reviews,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper: update average rating
const updateBookRating = async (bookId) => {
  const result = await ReviewSchemaModel.aggregate([
    { $match: { book: new mongoose.Types.ObjectId(bookId) } },
    {
      $group: {
        _id: "$book",
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const avgRating = result.length > 0 ? result[0].avgRating : 0;
  await BookSchemaModel.findByIdAndUpdate(bookId, {
    averageRating: avgRating.toFixed(2),
  });
};

// POST /books/:id/reviews
export const addReview = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { rating, comment } = req.body;

    const book = await BookSchemaModel.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existingReview = await ReviewSchemaModel.findOne({
      book: bookId,
      user: req.user.id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this book" });
    }

    const newReview = await ReviewSchemaModel.create({
      book: bookId,
      user: req.user.id,
      rating,
      comment,
    });

    await updateBookRating(bookId);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /reviews/:id
export const updateReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await ReviewSchemaModel.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

    review.rating = rating ?? review.rating;
    review.comment = comment ?? review.comment;
    await review.save();

    await updateBookRating(review.book);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /reviews/:id
export const deleteReview = async (req, res) => {
  try {
    const { id: reviewId } = req.params;

    const review = await ReviewSchemaModel.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review" });
    }

    await ReviewSchemaModel.findByIdAndDelete(reviewId);
    await updateBookRating(review.book);

    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
