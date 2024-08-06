import { ObjectId, Document } from "mongoose";
import { Request } from "express";

export interface UserTypes extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}
