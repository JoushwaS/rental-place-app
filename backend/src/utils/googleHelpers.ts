import axios from "axios";

interface Place {
  name: string;
  address: string;
  lat: Number;
  lng: Number;
}
export const getNearbyRentalPlaces = async (
  lat: Number,
  lng: Number
): Promise<any[]> => {
  const apiKey = process.env.GOOGLE_MAPS_KEY as unknown as string;
  const radius = 500; // Radius in meters

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=rental&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const places: Place[] = response.data.results.map((result: any) => ({
      name: result.name,
      address: result.vicinity,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
    }));

    return places;
  } catch (error) {
    console.error("Error retrieving nearby rental places:", error);
    return [];
  }
};
