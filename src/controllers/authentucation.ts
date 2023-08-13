import { UserModel } from "db/Users";
import express from "express";
import { getUserByEmail, createUser } from "db/Users";
import { random, authentication } from "helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, age, gender, password } = req.body;
    // First Check if User Exists in ourDatabase
    if (!email || !password || age || username || gender) {
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
        }
    });
    res.status(201).json({message: "User registered Successfully"});
  } catch (error) {
    res.status(500).json({error: "Error Occured in Creating User"})
  }
};
