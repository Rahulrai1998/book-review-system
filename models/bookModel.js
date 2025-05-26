import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    title: {
      type: String,
      required: [true, "Title Required!!"],
    },
    author: {
      type: String,
      required: [true, "Author Required!"],
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre Required!"],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const BookSchemaModel = mongoose.model("book", bookSchema);
