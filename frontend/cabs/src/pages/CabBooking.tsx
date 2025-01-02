import { useState } from "react";
import CabSelection from "../components/CabSelection";
import Location from "../components/Location";
import { LngLat } from "maplibre-gl";

export  function CabBooking() {
    const[source,setSource]= useState<LngLat|null>(null)
    const[destination,setDestination]= useState<LngLat|null>(null)
    function updateCoordinates(source:LngLat,destination:LngLat){
        setSource(source);
        setDestination(destination);
    }
  return (
    <div>
      <Location updateCoordinates={updateCoordinates} ></Location>
      <CabSelection sourceCoordinates={source} destinationCoordinates={destination}></CabSelection>
    </div>
  );
}
