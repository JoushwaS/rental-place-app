import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { hash, compare } from "bcryptjs";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET_KEY";
const SALT_ROUND = process.env.SALT_ROUND || 10;
type DecodedTokenType = {
  userId: string;
  iat: number;
  exp: number;
};

export type DecodedLoginTokenType = {
  _id: string;
  name: string;

  email: string;
  iat: number;
  exp: number;
};
export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, SALT_ROUND);
};

export const comparePassword = async (
  hashPassword: string,
  inputPassword: string
): Promise<boolean> => {
  return await compare(inputPassword, hashPassword);
};

export const generateJWT = (payload: object): string => {
  return sign(payload, SECRET_KEY);
};

export const verifyJWT = (token: string): DecodedLoginTokenType => {
  const decode: DecodedLoginTokenType = verify(
    token,
    SECRET_KEY
  ) as DecodedLoginTokenType;
  if (!decode) throw new Error("You are not authorized to perform this action");
  return decode;
};

export const decordToken = (token: string): string => {
  const decodedToken = verify(token, SECRET_KEY) as DecodedTokenType;
  return decodedToken.userId;
};
