import express from "express";
import { getUsers, deleteUserById, getUserById } from "../db/Users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Oops! Server error!" });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);
    return res.status(202).json({ message: "User deleted Successfully" });
  } catch (error) {
    return res.status(409).json({ message: "Opps User not deleted try again" });
  }
};
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username, age, gender } = req.body;
    if (!username || !age || !gender) {
      return res.status(400).json({ message: "Fill in the fields" });
    }
    const user = await getUserById(id);
    user.username = username;
    user.age = age;
    user.gender = gender;
    await user.save();
    return res.status(202).json({ message: "Updated Successfully" });
  } catch (error) {
    return res.status(406).json({ error: "Not Acceptable" });
  }
};
