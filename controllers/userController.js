import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@description: register new user
//@route: POST /api/contacts/register
//@access: Public
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username,email)
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }

  const userAlreadyExists = await UserModel.findOne({ email });
  if (userAlreadyExists) {
    res.status(400);
    throw new Error("User already exists!");
  }
  //PASSWORD HASHING
  const hashedPassword = await bcrypt.hash(password, 10);

  const registeredUser = await UserModel.create({
    username: username,
    email: email,
    password: hashedPassword,
  });

  if (registeredUser) {
    const { id, email } = registeredUser;
    console.log(`User registered successfully ${registeredUser}`);
    res.status(201).json({ _id: id, email });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
  res.json({ message: "User Created" });
});

//@description: login user
//@route: POST /api/contacts/login
//@access: Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  //FIND THE USER BY EMAIL
  const user = await UserModel.findOne({ email });

  //COMPARE REQUESTED PASSWORD WITH THE HASHED PASSWORD ASSOCIATED WITH THE email
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "60m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Wrong credentials!");
  }
});

//@description: get current user
//@route: GET /api/contacts/currentUser
//@access: Private
export const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
