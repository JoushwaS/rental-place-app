import { PrismaClient } from "@prisma/client";
import { getNearbyRentalPlaces } from "../utils/googleHelpers";
import { MongoClient, Db } from "mongodb";

const prisma = new PrismaClient();
const mongoClient = new MongoClient(process.env.MONGO_DB_URL || "", {});
let db: Db;

mongoClient
  .connect()
  .then((client) => {
    db = client.db();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const RentalService = {
  createRental: async (data: any): Promise<any> => {
    try {
      console.log("data>>", data);
      const rental = await prisma.rentalPlace.create({
        data: {
          ...data,
        },
      });
      return rental;
    } catch (error) {
      console.error("Error creating rental:", error);
      return error;
    }
  },

  fetchRentalPlaces: async ({
    lat,
    lng,
    radius = 5000, // Default radius in meters
  }: {
    lat: number;
    lng: number;
    radius?: number;
  }): Promise<any> => {
    console.log("fetchRentalPlaces>>>", lat, lng, radius);

    try {
      // Convert radius from meters to radians
      const radiusInRadians = radius / 6378100;

      const rentalPlaces: any = await prisma.$runCommandRaw({
        find: "RentalPlace",
        filter: {
          location: {
            $geoWithin: {
              $centerSphere: [
                [lng, lat], // MongoDB expects [lng, lat]
                10000,
              ],
            },
          },
        },
      });

      console.log("rentalPlaces>>>", rentalPlaces?.cursor?.firstBatch);
      return rentalPlaces?.cursor?.firstBatch;
    } catch (error) {
      console.error("Error fetching rental places:", error);
      return error;
    }
  },
};

export default RentalService;
