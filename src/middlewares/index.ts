import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/Users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["TERENCE-AUTH"];
    if (!sessionToken) {
      return res.status(403).json({ message: "UnAuthorized" });
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403).json({ message: "UnAuthorized" });
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {}
};
export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;

    // If the user is not authenticated
    if (!currentUserId) {
      return res.status(400).json({ message: "Not Authorized" });
    }

    // If the authenticated user's ID does not match the resource's ID
    if (currentUserId.toString() !== id) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    // If the user is the owner, call the next middleware/controller
    next();
  } catch (error) {
    return res.status(500).json({ message: "Oops an error occurred" });
  }
};
