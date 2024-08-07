export const typeDefs = `

type Coordinates {
  lat:Float
  lng:Float
}

type Address {
  coordinates:[Coordinates]
  street:String
}
type User {
                id: ID!
                name: String!
              
                email: String!
                password: String!
                token: String
                location:Address
            }`;
