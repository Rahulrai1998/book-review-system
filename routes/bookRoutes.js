import express, { Router } from "express";

import validateToken from "../middleware/validateTokenHandler.js";

const bookRouter = Router();
bookRouter.use(validateToken);
bookRouter.route("/").get(getContacts).post(createContact);
bookRouter
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default bookRouter;
