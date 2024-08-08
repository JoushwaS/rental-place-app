import AuthService from "../../services/auth.service";
import { UserInput } from "../../types";

const queries = {};
const mutations = {
  createUser: async (
    parent: any,
    { name, email, password, location }: UserInput
  ) => {
    const user = await AuthService.registerUser({
      name,
      email,
      password,
      location,
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
