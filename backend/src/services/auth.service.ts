import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/helpers";
import logger from "../utils/logger";
const prisma = new PrismaClient();

const AuthService = {
  async registerUser(
    name: string,
    password: string,
    email: string
  ): Promise<void> {
    // TODO: Implement user registration logic using Prisma
    const hashedPass = await hashPassword(password);
    try {
      const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPass,
        },
      });
    } catch (error) {
      //   sendErrorResponse({
      //     error: error !== "" ? error?.message : "",
      //     statusCode: 500,
      //   });
      logger.error("Error while creating user");
    }
  },
  async loginUser(username: string, password: string): Promise<boolean> {
    // TODO: Implement user login logic using Prisma
    return false;
  },
  async logoutUser(): Promise<void> {
    // TODO: Implement user logout logic using Prisma
  },
};

export default AuthService;
