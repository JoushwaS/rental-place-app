import { ObjectId, Document } from "mongoose";
import { Request } from "express";
interface ReqUser {
  _id: string;
  name: string;

  email: string;
}
export interface UserTypes extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  location: {
    type: string;
    coordinates: [number];
  };
}
export interface CustomRequest extends Request {
  reqUser: ReqUser;
}
