import express from "express";
import authRoutes from "./authRoutes";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  authRoutes(router);
  users(router);

  return router;
};
