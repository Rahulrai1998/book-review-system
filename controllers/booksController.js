import asyncHandler from "express-async-handler";
import { BookSchemaModel } from "../models/bookModel.js";

//@description: get all contacts
//@route: GET /api/contacts
//@access: private
export const getBooks = asyncHandler(async (req, res) => {
  const contacts = await BookSchemaModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
//@description: get all books by author or title filter
//@route: GET /api/contacts
//@access: private
export const getBooksByFilter = asyncHandler(async (req, res) => {
  const contacts = await BookSchemaModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@description: create new contact
//@route: POST /api/contacts
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

//@description: get contact
//@route: GET /api/contacts/:id
//@access: private
export const getBook = asyncHandler(async (req, res) => {
  const contact = await BookSchemaModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  res.status(200).json(contact);
});

//@description: delete contact
//@route: DELETE /api/contacts/:id
//@access: private
export const deleteBook = asyncHandler(async (req, res) => {
  const contact = await BookSchemaModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("UNAUTHORIZED ACCESS!!");
  }
  await BookSchemaModel.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
