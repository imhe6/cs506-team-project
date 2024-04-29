import React from "react";
import { useParams } from "react-router-dom";

function AircraftListPage() {
  const { airportId } = useParams();

  // Now you can use airportId to filter your aircraft data

  return (
    <div>
      <h1>Aircraft List for Airport: {airportId}</h1>
      {/* Display your filtered aircraft list here */}
    </div>
  );
}

export default AircraftListPage;
