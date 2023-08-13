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
