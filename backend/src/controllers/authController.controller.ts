import { Request, Response } from "express";
import { hashPassword } from "../utils/helpers";
import UserSchema from "../models/User/user.schema";
import { sendSuccessResponse } from "../utils/response";

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    // Your code to handle user registration goes here
    const { name, email, password } = req.body;
    const encryptedPassword = await hashPassword(password);
    const user = await UserSchema.create({
      name,
      email,
      password: encryptedPassword,
    });

    sendSuccessResponse({
      res,
      message: `User registered successfully`,
      data: { user },
    });
    // res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login an existing user
export const login = async (req: Request, res: Response) => {
  try {
    // Your code to handle user login goes here

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout a user
export const logout = async (req: Request, res: Response) => {
  try {
    // Your code to handle user logout goes here

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
