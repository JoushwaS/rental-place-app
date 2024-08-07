import { PrismaClient } from "@prisma/client";
import { getNearbyRentalPlaces } from "../utils/googleHelpers";
const prisma = new PrismaClient();

const RentalService = {
  createRental: async (data: any): Promise<any> => {
    try {
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
  }: {
    lat: Number;
    lng: Number;
  }): Promise<any> => {
    try {
      const rentalPlaces = await getNearbyRentalPlaces(lat, lng);

      return rentalPlaces;
    } catch (error) {
      console.error("Error fetching rental places:", error);
      return error;
    }
  },
};

export default RentalService;
