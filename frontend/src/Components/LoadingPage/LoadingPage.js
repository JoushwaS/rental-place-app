import React from "react";
import { Spinner } from "@chakra-ui/react";
import "./LoadingPage.css";

export default function LoadingPage() {
  return (
    <div className="loading-page-container">
      <div className="floated-circle-1" />
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red"
        size="xl"
      />
      <div className="floated-circle-2" />
    </div>
  );
}
