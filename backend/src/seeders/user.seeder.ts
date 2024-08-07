import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { UserInput } from "../types";
const prisma = new PrismaClient();
const seed_data: number = (process.env.SEED_DATA as unknown as number) || 30;

export const seedUsers = async () => {
  try {
    const users: any = [];

    // Generate 10 users
    for (let i = 0; i < seed_data; i++) {
      const user: UserInput = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password:
          "$2a$10$nvEUutywhAx8iRGcVN6pM.ukWAP2KP1H2M7YT1XbMoWFSz6issqVy",
      };
      users.push(user);
    }

    // Insert users into the database
    await prisma.user.createMany({
      data: users,
    });

    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await prisma.$disconnect();
  }
};
