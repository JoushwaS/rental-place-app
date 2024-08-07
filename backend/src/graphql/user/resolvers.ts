import AuthService from "../../services/auth.service";
import { UserInput } from "../../types";

const queries = {};
const mutations = {
  createUser: async (parent: any, { name, email, password }: UserInput) => {
    const user = await AuthService.registerUser({
      name,
      email,
      password,
    });
    return user;
  },
  loginUser: async (parent: any, { email, password }: UserInput) => {
    const user = await AuthService.loginUser({
      email,
      password,
    });
    return user;
  },
};
export const resolvers = { queries, mutations };
