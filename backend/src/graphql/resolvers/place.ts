import Place from "../../models/Place/place.schema";
import User from "../../models/User/user.schema";

interface IPlaceInput {
  title: string;
  description: string;
  lat: number;
  lng: number;
}

interface IPlaceArgs {
  placeInput: IPlaceInput;
}

interface ILatLngArgs {
  lat: number;
  lng: number;
}

const placeResolver = {
  createPlace: async (args: IPlaceArgs, req: any) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const place = new Place({
      title: args.placeInput.title,
      description: args.placeInput.description,
      lat: args.placeInput.lat,
      lng: args.placeInput.lng,
      creator: req.userId,
    });
    let createdPlace;
    try {
      const result = await place.save();
      // createdPlace = { ...result._doc, _id: result.id };
      const creator = await User.findById(req.userId);
      if (!creator) {
        throw new Error("User not found.");
      }
      // creator.createdPlaces.push(place);
      await creator.save();
      return createdPlace;
    } catch (err) {
      throw err;
    }
  },
  places: async (args: ILatLngArgs) => {
    try {
      const places = await Place.find({ lat: args.lat, lng: args.lng });
      return places.map((place) => {
        // return { ...place._doc, _id: place.id };
      });
    } catch (err) {
      throw err;
    }
  },
};

export default placeResolver;
