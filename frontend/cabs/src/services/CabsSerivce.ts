import { LngLat } from "maplibre-gl";
import OlaService from "./OlaService";
import UberService from "./UberService";
import { merge } from "rxjs";
import { CabVendors } from "../enum/CabVendors.enum";
import { Predictions } from "./OlaMapsService";

export default class CabsService {
  private olaService: OlaService;
  private uberService: UberService;
  constructor() {
    this.olaService = new OlaService();
    this.uberService = new UberService();
  }

  getCabs(source:Predictions,destination:Predictions){
    const sourceLngLat = new LngLat(source.geometry.location.lng, source.geometry.location.lat);
    const destinationLngLat = new LngLat(destination.geometry.location.lng, destination.geometry.location.lat);
    return merge(this.olaService.getCabs(sourceLngLat, destinationLngLat), this.uberService.getCabs(sourceLngLat, destinationLngLat))
  }

  //todo: implemention not done
  bookCabs(vendor:CabVendors, source:LngLat, destination:LngLat,rideCategory:string,fareId:string){
    if(vendor === CabVendors.OLA){
      return this.olaService.bookCab(source,destination,rideCategory,fareId)
    }else{
      return this.uberService.bookCab(source,destination, rideCategory)
    }
  }
}
