import { useState } from "react";
import Location from "../components/Location";
import CabService from "../services/CabsSerivce";
import { GetCabsRespose } from "../models/GetCabs.model";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { LngLat } from "maplibre-gl";
import CabSelection from "../components/CabSelection";
import { Predictions } from "../services/OlaMapsService";

export  function CabBooking() {
    const[source,setSource]= useState<LngLat|null>(null)
    const[destination,setDestination]= useState<LngLat|null>(null)
    const[cabService, _] = useState(new CabService());
    const[currentCabsList,setCurrentCabsList]=useState<GetCabsRespose>();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };
    function updateCoordinates(source:Predictions,destination:Predictions){
        // setSource(source);
        // setDestination(destination);
        cabService.getCabs(source, destination).subscribe((result) => {
          setCurrentCabsList(result);
        });
    }
  return (
    <div>
      <Location updateCoordinates={updateCoordinates} ></Location>
      <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Cab Selection</DialogTitle>
                <DialogContent>
                    {currentCabsList && <CabSelection currentCabsList={currentCabsList}></CabSelection>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
}
