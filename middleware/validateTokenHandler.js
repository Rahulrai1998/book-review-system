import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
  // let token;
  // let authHeader = req.headers.authorization || req.headers.Auhtorization;
  // if (authHeader && authHeader.startsWith("Bearer")) {
  //   token = authHeader.split(" ")[1];
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
  //     if (error) {
  //       res.status(401);
  //       throw new Error("UNAUTHORIZED USER!!");
  //     }
  //     req.user = decoded.user;
  //     next();
  //   });
  // }
  // if (!token) {
  //   res.status(401);
  //   throw new Error("UNAUTHORIZED USER OR TOKEN MISSING!!");
  // }
});

export default validateToken;
