import mongoose, { model, Schema } from "mongoose";
import { UserTypes } from "../../types";
const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});
const UserModel = new Schema<UserTypes>(
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
    location: locationSchema,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
UserModel.index({ name: "text", email: "text" });
UserModel.index({ userLocation: "2dsphere" });
const UserSchema = model("users", UserModel);

export default UserSchema;
