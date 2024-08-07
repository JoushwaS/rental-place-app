import logger from "../utils/logger";
import { seedUsers } from "./user.seeder";
import { seedRentals } from "./rental.seeder";

export const getRandomInRange = (from: number, to: number, fixed: number) => {
  return Number((Math.random() * (to - from) + from).toFixed(fixed));
};
const seedDatabase = async () => {
  logger.verbose("SEEDING STARTED");

  await seedUsers();
  await seedRentals();
  logger.verbose("SEEDING ENDED");
};

seedDatabase();
