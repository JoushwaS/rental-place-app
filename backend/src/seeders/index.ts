import logger from "../utils/logger";
import { seedUsers } from "./user.seeder";

export const getRandomInRange = (from: number, to: number, fixed: number) => {
  return Number((Math.random() * (to - from) + from).toFixed(fixed));
};
const seedDatabase = async () => {
  logger.verbose("SEEDING STARTED");

  await seedUsers();
  logger.verbose("SEEDING ENDED");
};

seedDatabase();
