export const typeDefs = `

type Place {
  name: String
  address: String
  lat: Float
  lng: Float
}
type Coordinates {
  lat:Float
  lng:Float
}

type Address {
  coordinates:[Coordinates]
  street:String
}
type RentalPlace {
                id: ID!
                placeName: String!
                 rentedBy:  User
                rentedById: String
                
                  address:    Address

            }`;
