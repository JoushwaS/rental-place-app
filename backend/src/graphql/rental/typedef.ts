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
}

type Location {
  type: String
  coordinates: [Float]
}


type FetchUserRentalPlacesResponse {
  id: ID!
  placeName: String!

  rentedById: String
  address: String
  location: Location
}
`;
