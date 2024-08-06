import { Schema } from "mongoose";
import { UserTypes } from "../../types";

const UserSchema = new Schema<UserTypes>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.index({ name: "text", email: "text" });
export default UserSchema;
