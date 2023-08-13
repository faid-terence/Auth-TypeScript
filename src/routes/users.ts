import express from "express";

import { getAllUsers, deleteUser, updateUser, fetchUserById } from "../controllers/user";
import { isAuthenticated, isOwner } from "../middlewares/index";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/user/:id", isAuthenticated,fetchUserById);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/user/:id", isAuthenticated, isOwner , updateUser);
};
