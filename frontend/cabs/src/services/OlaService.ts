import { LngLat } from "maplibre-gl";
import { ChromeService } from "./ChromeService";
import globalContainer from "./DependencyContainer";
import { map, tap, switchMap, of, retry, shareReplay } from "rxjs";
import { OlaGetCabs } from "../models/OlaGetCabs.model";
import { GetCabsRespose } from "../models/GetCabs.model";
import { OlaPreBook } from "../models/OlaPreBook.model";
import { Predictions } from "./OlaMapsService";

export default class OlaService {
  private netorkManager!: ChromeService;
  private csrfToken!: string;
  private url: string = "https://book.olacabs.com/";
  constructor() {
    console.log("from ola service ");
    this.netorkManager = new ChromeService();
    this.netorkManager.initilize(this.url).subscribe();
  }

  getCabs(source: Predictions | null, destination: Predictions | null) {
    return this.netorkManager
      .fetch<OlaGetCabs>(
        `https://book.olacabs.com/data-api/category-fare/p2p?pickupLat=${source?.geometry?.location?.lat}&pickupLng=${source?.geometry?.location?.lng}&pickupMode=NOW&dropLat=${destination?.geometry?.location?.lat}&dropLng=${destination?.geometry?.location?.lng}&silent=false&suggestPickup=true`
      )
      .pipe(map((data) => this.transformOlaResponse(data)));
  }
  private transformOlaResponse(olaResponse: OlaGetCabs): GetCabsRespose {
    return {
      vendorName: "Ola",
      rides: olaResponse.data.categories,
      error: olaResponse.error,
    };
  }

  bookCab(source: LngLat, destination: LngLat, rideCategory: string,fareId:string) {
    return this.getCsrfToken().pipe(
      switchMap((csrfToken) => {
        return this.netorkManager.fetch(
          "https://book.olacabs.com/web-api/book",
          {
            headers: {
              "csrf-token": csrfToken,
            },
            body: `{"fromLocation":{"lat":${source.lat},"lng":${source.lng},"isCurrent":false,"resolveName":false,"pickupZoneId":0},"toLocation":{"lat":${destination.lat},"lng":${destination.lng}},"serviceType":"p2p","pickupMode":"NOW","pickupTime":0,"category":${rideCategory},"paymentType":1,"couponCode":"","fareId":"604a70ed-b77c-4aa4-92b4-4d9058056ba8","retryCount":0,"liteParams":{}}`,
            method: "POST",
            mode: "cors",
            credentials: "include",
          }
        );
      })
    );
  }

  private preBookCab(
    source: LngLat,
    destination: LngLat,
    rideCategory: string,
    fareId: string
  ) {
    return this.getCsrfToken().pipe(
      switchMap((csrfToken) =>
        this.netorkManager.fetch<OlaPreBook>(
          "https://book.olacabs.com/data-api/prebook?silent=true",
          {
            headers: {
              "csrf-token": csrfToken,
            },
            body: `{\"fromLocation\":{\"lat\":${source.lat},\"lng\":${source.lng},\"isCurrent\":false,\"resolveName\":false,\"pickupZoneId\":0},\"toLocation\":{\"lat\":${destination.lat},\"lng\":${destination.lng}},\"serviceType\":\"p2p\",\"pickupMode\":\"NOW\",\"pickupTime\":0,\"category\":${rideCategory},\"paymentType\":1,\"couponCode\":\"\",\"fareId\":${fareId},\"leadSource\":\"desktop_website\",\"retryCount\":0,\"liteParams\":{}}`,
            method: "POST",
            mode: "cors",
            credentials: "include",
          }
        )
      )
    );
  }

  private getCsrfToken() {
    return this.netorkManager.getCookie(this.url, "_csrf").pipe(
      map((cookie) => cookie?.value ?? ""),
      shareReplay()
    );
  }
}
