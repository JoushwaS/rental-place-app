import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { UserInput } from "../types";
const prisma = new PrismaClient();
const seed_data: number = (process.env.SEED_DATA as unknown as number) || 30;

export const seedRentals = async () => {
  try {
    // const get users
    const users = await prisma.user.findMany();

    // now based on random users create rentals records
    const rentals: any = [];

    // Generate  rentals
    for (let i = 0; i < seed_data; i++) {
      const rental = {
        placeName: faker.location.street(),
        rentedById: users[Math.floor(Math.random() * users.length)].id,
        address: faker.location.streetAddress(),
        coordinates: faker.location.nearbyGPSCoordinate({
          origin: [24.9124684, 67.1004981],
          radius: 1000,
          isMetric: true,
        }),
      };
      rentals.push(rental);
    }

    // Insert users into the database
    await prisma.rentalPlace.createMany({
      data: rentals,
    });

    console.log("Rentals seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await prisma.$disconnect();
  }
};
