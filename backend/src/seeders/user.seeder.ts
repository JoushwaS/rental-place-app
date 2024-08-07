import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { UserInput } from "../types";
const prisma = new PrismaClient();
const seed_data: number = (process.env.SEED_DATA as unknown as number) || 30;

export const seedUsers = async () => {
  try {
    const users: any = [];

    // Generate  users
    for (let i = 0; i < seed_data; i++) {
      const user: UserInput = {
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password:
          "$2a$10$Vi9s8VjLfHT1smmFdTlWyOq7relxXNx6rHla2XdQkfNTdGl8/D8OS",
        location: {
          coordinates: faker.location.nearbyGPSCoordinate({
            origin: [24.9124684, 67.1004981],
            radius: 1000,
            isMetric: true,
          }),
          street: faker.location.streetAddress(),
        },
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
