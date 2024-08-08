import RentalService, {
  FetchRentalPlacesByUserIdParams,
} from "../../services/rental.service";
import { fetchRentalPlaces, RentalPlace } from "../../types";

const queries = {
  fetchRentalPlaces: async (parent: any, { lat, lng }: fetchRentalPlaces) => {
    console.log("fetchRentalPlaces");
    const rentalPlaces = await RentalService.fetchRentalPlaces({
      lat,
      lng,
    });
    return rentalPlaces;
  },
  fetchRentalPlacesByUserId: async (
    parent: any,
    { rentedById }: FetchRentalPlacesByUserIdParams
  ) => {
    console.log("fetchRentalPlaces");
    const rentalPlaces = await RentalService.fetchRentalPlacesByUserId({
      rentedById,
    });
    return rentalPlaces;
  },
};
const mutations = {
  createRental: async (parent: any, data: RentalPlace) => {
    const rental = await RentalService.createRental(data);
    return rental;
  },
};
export const resolvers = { queries, mutations };
