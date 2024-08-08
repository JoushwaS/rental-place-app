// src/Dashboard.js
import React, { useEffect, useState } from "react";
import MapComponent from "../../Components/MapComponent/MapComponent";
import { Button, Input, Modal } from "antd";
import AddressInput from "../../Components/AddressInput/AddressInput";
import { toast } from "react-toastify";
import { gql, useMutation, useQuery } from "@apollo/client";

function Dashboard() {
  const ADD_RENTAL_PLACE = gql`
    mutation Mutation(
      $placeName: String!
      $rentedById: String
      $address: String
      $coordinates: CoordinatesInput
    ) {
      createRental(
        placeName: $placeName
        rentedById: $rentedById
        address: $address
        coordinates: $coordinates
      ) {
        placeName
        address
      }
    }
  `;

  const FETCH_USER_RENTAL_PLACES = gql`
    query Query($rentedById: String) {
      fetchRentalPlacesByUserId(rentedById: $rentedById) {
        placeName

        id
        location {
          coordinates
          type
        }
      }
    }
  `;
  const [createRental, { loading, reset }] = useMutation(ADD_RENTAL_PLACE);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const userInfo = JSON.parse(window.localStorage.getItem("rental-token"));

  const [userRentalLocationList, setuserRentalLocationList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: dataFetchUserRentalPlaces,
    loading: loadingFetchUserRentalPlaces,
    error: errorFetchUserRentalPlaces,
    refetch,
  } = useQuery(FETCH_USER_RENTAL_PLACES, {
    variables: { rentedById: userInfo?.id },
  });

  const [rentalPlaceInfo, setrentalPlaceInfo] = useState({
    placeName: "",
    rentedById: userInfo?.id,
    address: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  });
  //get current position using geo location in useEffect
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          toast.error(err.message);
        },
        {
          enableHighAccuracy: true, // Enable high accuracy
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0, // Do not use a cached position
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (dataFetchUserRentalPlaces) {
      const { fetchRentalPlacesByUserId } = dataFetchUserRentalPlaces;
      if (fetchRentalPlacesByUserId) {
        const locationList = fetchRentalPlacesByUserId.map((place) => {
          return {
            lat: place.location.coordinates[1],
            lng: place.location.coordinates[0],
          };
        });

        setuserRentalLocationList(locationList);
      }
    }
  }, [dataFetchUserRentalPlaces, refetch]);

  const handleAddRentalPlace = () => {
    if (rentalPlaceInfo.placeName === "") {
      toast.error("Please enter place name");
      return;
    } else if (rentalPlaceInfo.address === "") {
      toast.error("Please enter address");
      return;
    }

    createRental({
      variables: {
        placeName: rentalPlaceInfo.placeName,
        rentedById: rentalPlaceInfo.rentedById,
        address: rentalPlaceInfo.address,
        coordinates: {
          lat: rentalPlaceInfo.location.coordinates[1],
          lng: rentalPlaceInfo.location.coordinates[0],
        },
      },
    })
      .then((res) => {
        const { data } = res;

        if (data.createRental) {
          toast.success("Rental Place added successfully");
          setIsModalOpen(false);
          setrentalPlaceInfo({
            placeName: "",
            rentedById: userInfo?.id,
            address: "",
            location: {
              type: "Point",
              coordinates: [0, 0],
            },
          });
          reset();
          refetch();
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.log("error", error.message);
      });
  };

  const handleAddressSelect = (place) => {
    const { lat, lng } = place.geometry.location;
    const lngL = lng();
    const latL = lat();
    setrentalPlaceInfo({
      ...rentalPlaceInfo,
      address: place.formatted_address,

      location: {
        type: "Point",
        coordinates: [lngL, latL],
      },
    });
  };
  const handleLogout = () => {
    window.localStorage.removeItem("rental-token");
    window.location.href = "/login";
  };

  return (
    <div className="">
      <div className=" p-10 flex justify-between items-center mb-4 bg-slate-400">
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {userInfo ? userInfo?.email : ""}
        </h1>
        <Button
          size="large"
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        >
          Logout
        </Button>
      </div>
      <div className=" p-5 flex justify-between items-center mb-4 ">
        <h1 className="text-xl font-semibold mb-4 text-blue-300">
          Your Rental Places, {userRentalLocationList?.length}
        </h1>
        <Button
          size="large"
          style={{ backgroundColor: "#2b6cb0" }}
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        >
          Add Rental Place
        </Button>{" "}
      </div>

      <div className="flex justify-center items-center mb-4">
        <MapComponent
          key={userRentalLocationList.length} // Force re-render when locationList changes
          markerPosition={{
            lat: currentLocation.lat,
            lng: currentLocation.lng,
          }}
          defaultCenter={{
            lat: currentLocation.lat,
            lng: currentLocation.lng,
          }}
          zoom={50}
          radius={0}
          locationList={userRentalLocationList}
        />
      </div>

      <Modal
        title="Add Rental Place"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex justify-between flex-col h-40">
          <Input
            placeholder="Place Name"
            value={rentalPlaceInfo.placeName}
            onChange={(e) => {
              setrentalPlaceInfo({
                ...rentalPlaceInfo,
                placeName: e.target.value,
              });
            }}
          />
          <AddressInput onAddressSelect={handleAddressSelect} />
          <Button
            disabled={
              loading ||
              rentalPlaceInfo.placeName === "" ||
              rentalPlaceInfo.address === ""
            }
            onClick={handleAddRentalPlace}
            danger
          >
            Add{" "}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
