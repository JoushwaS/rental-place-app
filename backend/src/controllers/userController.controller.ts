import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User/user.model";
import ModelFunctions from "../models";
const userModel = ModelFunctions(UserModel);

// Get user info by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, name, password } = req.body;

    // Find user by ID
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    user.email = email;
    user.name = name;
    user.password = hashedPassword;
    // await user.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Find all users
    const users = await UserModel.find();

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//create delete user controller
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //delete user
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
