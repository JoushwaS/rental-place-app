export const typeDefs = `
type Place {
  name: String
  address: String
  lat: Float
  lng: Float
}

type Coordinates {
  lat: Float
  lng: Float
}

input CoordinatesInput {
  lat: Float
  lng: Float
}

type RentalPlace {
  id: ID!
  placeName: String!

  rentedById: String
  address: String
  coordinates: Coordinates
}`;
