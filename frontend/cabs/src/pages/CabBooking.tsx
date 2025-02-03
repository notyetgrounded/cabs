import { useState } from "react";
import Location from "../components/Location";
import { Predictions } from "../services/OlaMapsService";
import CabService from "../services/CabsSerivce"
import globalContainer from "../services/DependencyContainer";

export  function CabBooking() {
    const[source,setSource]= useState<Predictions|null>(null)
    const[destination,setDestination]= useState<Predictions|null>(null)
    // const[cabService, _] = useState(globalContainer.resolve<CabService>('cabsService'));
    const[cabService, _] = useState(new CabService());
    function updateCoordinates(source:Predictions,destination:Predictions){
        // setSource(source);
        // setDestination(destination);
        cabService.getCabs(source,destination).subscribe((cabs)=>{
            console.log(cabs);
        })
    }
  return (
    <div>
      <Location updateCoordinates={updateCoordinates} ></Location>
      {/* <CabSelection sourceCoordinates={source} destinationCoordinates={destination}></CabSelection> */}
    </div>
  );
}
