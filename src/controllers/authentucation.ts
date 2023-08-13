import express from "express";
import { getUserByEmail, createUser, UserModel } from "../db/Users";
import { random, authentication } from "../helpers/index";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, age, gender, password } = req.body;
    // First Check if User Exists in ourDatabase
    if (!email || !password || !age || !username || !gender) {
      return res.status(401).json({ message: "Invalid input" });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(401).json({ message: "User already exists!" });
    }
    const salt = random();
    const user = await createUser({
      username,
      email,
      age,
      gender,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(201).json({ message: "User registered Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error Occured in Creating User" });
  }
};
export const loginUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Fill in required fields" });
    }
    const existingUser = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const expectedHash = authentication(
      existingUser.authentication.salt,
      password
    );
    if (existingUser.authentication.password !== expectedHash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const salt = random();
    existingUser.authentication.sessionToken = authentication(
      salt,
      existingUser._id.toString()
    );

    await existingUser.save();
    res.cookie("TERENCE-AUTH", existingUser.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });
    return res
      .status(200)
      .json({
        message: "Login Successfully",
        sessionToken: existingUser.authentication.sessionToken,
      });
  } catch (error) {
    return res.status(500).json({ error: "Oops! Server error" });
  }
};
