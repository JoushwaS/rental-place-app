import { ObjectId, Document } from "mongoose";
import { Request } from "express";
interface User {
  _id: string;
  name: string;

  email: string;
}
export interface userLogin {
  email: string;
  password: string;
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
export interface fetchRentalPlaces {
  lat: number;
  lng: number;
}
interface Address {
  coordinates: [Number, Number];
  street: String;
}
export interface UserInput {
  name?: string;
  email: string;
  password: string;
  token?: string;
  location: Address;
}
export interface CustomRequest extends Request {
  reqUser: User;
}

export interface RentalPlace {
  placeName: string;
  rentedBy: User;
  rentedById: string;

  address: string;
  coordinates: [Number, Number];
}
