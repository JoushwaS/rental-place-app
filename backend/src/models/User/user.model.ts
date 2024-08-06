import { model } from "mongoose";
import { UserTypes } from "../../types";
import UserSchema from "./user.schema";

export const UserCollection = "user";
export const UserModel = model<UserTypes>(UserCollection, UserSchema);
