import { PrismaClient } from "@prisma/client";
import { comparePassword, generateJWT, hashPassword } from "../utils/helpers";
import logger from "../utils/logger";
import { UserInput, userLogin } from "../types";
const prisma = new PrismaClient();

const AuthService = {
  async generateJwtToken(payload: object): Promise<string> {
    return generateJWT(payload);
  },
  async registerUser({ name, password, email }: UserInput): Promise<any> {
    // TODO: Implement user registration logic using Prisma

    const hashedPass = await hashPassword(password);
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        throw new Error("Email Already Exists");
      }
      const result = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPass,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      logger.error("Error while creating user");
      return error;
    }
  },
  async loginUser({ email, password }: userLogin): Promise<any> {
    // TODO: Implement user login logic using Prisma
    let result = {};
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await comparePassword(user.password, password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = generateJWT({ email: user.email, name: user.name });
      result = { ...user, token: token };
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async logoutUser(): Promise<void> {
    // TODO: Implement user logout logic using Prisma
  },
};

export default AuthService;
