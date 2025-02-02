import { LngLat } from "maplibre-gl";
import OlaService from "./OlaService";
import UberService from "./UberService";
import { delay, merge, of, switchMap, tap } from "rxjs";
import { CabVendors } from "../enum/CabVendors.enum";

export class CabsService {
  // private olaService: OlaService;
  private uberService: UberService;
  constructor() {
    // this.olaService = new OlaService();
    this.uberService = new UberService();
    of([])
      .pipe(
        delay(3000),
        // switchMap(() =>
        //   this.olaService
        //     .getCabs(
        //       new LngLat(77.54882, 12.93792),
        //       new LngLat(77.71433, 12.96755)
        //     )
        //     .pipe(tap((res) => console.log(res)))
        // ),
        switchMap(() =>
          this.uberService
            .getCabs(
              new LngLat(77.54882, 12.93792),
              new LngLat(77.71433, 12.96755)
            )
            .pipe(tap((res) => console.log(res)))
        )
      )
      .subscribe();
  }

  getCabs(source:LngLat,destination:LngLat){
    return merge(
      // this.olaService.getCabs(source,destination),
      this.uberService.getCabs(source,destination))
  }

  //todo: implemention not done
  bookCabs(vendor:CabVendors, source:LngLat, destination:LngLat,rideCategory:string,fareId:string){
    // if(vendor === CabVendors.OLA){
    //   // return this.olaService.bookCab(source,destination,rideCategory,fareId)
    // }else{
      return this.uberService.bookCab(source,destination, rideCategory)
    // }
  }
}
