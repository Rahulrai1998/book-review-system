import asyncHandler from "express-async-handler";
import { ContactSchemaModel } from "../models/bookModel.js";

//@description: get all contacts
//@route: GET /api/contacts
//@access: private
export const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactSchemaModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@description: create new contact
//@route: POST /api/contacts
//@access: private
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await ContactSchemaModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@description: get contact
//@route: GET /api/contacts/:id
//@access: private
export const getContact = asyncHandler(async (req, res) => {
  const contact = await ContactSchemaModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }
  res.status(200).json(contact);
});

//@description: update contact
//@route: PUT /api/contacts/:id
//@access: private
export const updateContact = asyncHandler(async (req, res) => {
  const contact = await ContactSchemaModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!!");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("UNAUTHORIZED ACCESS!!");
  }

  const updatedContact = await ContactSchemaModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@description: delete contact
//@route: DELETE /api/contacts/:id
//@access: private
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactSchemaModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("UNAUTHORIZED ACCESS!!");
  }
  await ContactSchemaModel.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
