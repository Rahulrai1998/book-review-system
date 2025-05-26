import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: [true, "Required!"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Required!"],
    },
    rating: {
      type: Number,
      required: [true, "Required!"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a user can only review a book once
reviewSchema.index({ book: 1, user: 1 }, { unique: true });

export const ReviewSchemaModel = mongoose.model("review", reviewSchema);
