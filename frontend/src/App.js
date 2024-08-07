import "./App.css";
import { gql, useQuery } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes/Router";

function App() {
  const query = gql`
    query FetchRentalPlaces($rentedById: String) {
      fetchRentalPlacesByUserId(rentedById: $rentedById) {
        placeName
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(query, {
    variables: { rentedById: "66b38a98b1907eae4aa5e49c" },
  });
  console.log("data", data);
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
