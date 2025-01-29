import { useState } from "react";
import CabSelection from "../components/CabSelection";
import Location from "../components/Location";
import CabService from "../services/CabsSerivce";
import { LngLat } from "maplibre-gl";

export  function CabBooking() {
    const[source,setSource]= useState<LngLat|null>(null)
    const[destination,setDestination]= useState<LngLat|null>(null)
    const[cabService, _] = useState(new CabService());
    function updateCoordinates(source:LngLat,destination:LngLat){
        // setSource(source);
        // setDestination(destination);
        cabService.getCabs(source, destination).subscribe((result) => {
          console.log(result);
        });
    }
  return (
    <div>
      <Location updateCoordinates={updateCoordinates} ></Location>
      {/* <CabSelection sourceCoordinates={source} destinationCoordinates={destination}></CabSelection> */}
    </div>
  );
}
