import RentalService from "../../services/rental.service";
import { fetchRentalPlaces } from "../../types";

const queries = {
  fetchRentalPlaces: async (parent: any, { lat, lng }: fetchRentalPlaces) => {
    console.log("fetchRentalPlaces");
    const rentalPlaces = await RentalService.fetchRentalPlaces({
      lat,
      lng,
    });
    return rentalPlaces;
  },
};
const mutations = {};
export const resolvers = { queries, mutations };
