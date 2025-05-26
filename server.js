import express from "express";
import dotenv from "dotenv/config";
import { errorHandler } from "./middleware/errorHandler.js";
import { connectDB } from "./config/dbConnection.js";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookRoutes.js";

connectDB();
const app = express();
const port = process.env.PORT || 5000;

//middlewares
//REQUEST BODY PARSER
app.use(express.json());
//ROUTES
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
//ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
