import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      requred: [true, "Username required!"],
    },
    email: {
      type: String,
      required: [true, "Email required!"],
      unique: [true, "Email alreday exists!"],
    },
    password: {
      type: String,
      required: [true, "Password required!"],
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("user", userSchema);
