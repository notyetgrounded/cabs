import { LngLat } from "maplibre-gl";
import { ChromeService } from "./ChromeService";
import globalContainer from "./DependencyContainer";
import { UberGetCabs } from "../models/UberGetCabs.model";
import { GetCabsRespose, RideCategory } from "../models/GetCabs.model";
import { map } from "rxjs";

export default class UberService {

  private netorkManager!: ChromeService;
  constructor() {
    console.log("from uber service ");
    this.netorkManager = new ChromeService();
    this.netorkManager.initilize("https://m.uber.com/go/home").subscribe();
    chrome.permissions.contains(
      { origins: ["https://m.uber.com/go/home"] },
      (result) => {
        if (result) {
          console.log("Permission granted for https://m.uber.com/go/home");
        } else {
          console.error("Permission denied for https://m.uber.com/go/home");
        }
      }
    );
  }

  getCabs(source: LngLat, destination: LngLat) {
    return this.netorkManager
      .fetch<UberGetCabs>("https://m.uber.com/go/graphql", {
        headers: {
          "content-type": "application/json",
          "sec-gpc": "1",
          "x-csrf-token": "x",
        },
        body: `{"operationName":"Products","variables":{"includeRecommended":false,"destinations":[{"latitude":${destination.lat},"longitude":${destination.lng}}],"pickup":{"latitude":${source.lat},"longitude":${destination.lng}}},"query":"query Products($capacity: Int, $destinations: [InputCoordinate!]!, $includeRecommended: Boolean = false, $pickup: InputCoordinate!, $pickupFormattedTime: String, $profileType: String, $profileUUID: String, $returnByFormattedTime: String, $stuntID: String, $targetProductType: EnumRVWebCommonTargetProductType) {\\n  products(\\n    capacity: $capacity\\n    destinations: $destinations\\n    includeRecommended: $includeRecommended\\n    pickup: $pickup\\n    pickupFormattedTime: $pickupFormattedTime\\n    profileType: $profileType\\n    profileUUID: $profileUUID\\n    returnByFormattedTime: $returnByFormattedTime\\n    stuntID: $stuntID\\n    targetProductType: $targetProductType\\n  ) {\\n    ...ProductsFragment\\n    __typename\\n  }\\n}\\n\\nfragment ProductsFragment on RVWebCommonProductsResponse {\\n  defaultVVID\\n  hourlyTiersWithMinimumFare {\\n    ...HourlyTierFragment\\n    __typename\\n  }\\n  intercity {\\n    ...IntercityFragment\\n    __typename\\n  }\\n  links {\\n    iFrame\\n    text\\n    url\\n    __typename\\n  }\\n  productsUnavailableMessage\\n  tiers {\\n    ...TierFragment\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment BadgesFragment on RVWebCommonProductBadge {\\n  color\\n  text\\n  __typename\\n}\\n\\nfragment HourlyTierFragment on RVWebCommonHourlyTier {\\n  description\\n  distance\\n  fare\\n  fareAmountE5\\n  farePerHour\\n  minutes\\n  packageVariantUUID\\n  preAdjustmentValue\\n  __typename\\n}\\n\\nfragment IntercityFragment on RVWebCommonIntercityInfo {\\n  oneWayIntercityConfig(destinations: $destinations, pickup: $pickup) {\\n    ...IntercityConfigFragment\\n    __typename\\n  }\\n  roundTripIntercityConfig(destinations: $destinations, pickup: $pickup) {\\n    ...IntercityConfigFragment\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment IntercityConfigFragment on RVWebCommonIntercityConfig {\\n  description\\n  onDemandAllowed\\n  reservePickup {\\n    ...IntercityTimePickerFragment\\n    __typename\\n  }\\n  returnBy {\\n    ...IntercityTimePickerFragment\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment IntercityTimePickerFragment on RVWebCommonIntercityTimePicker {\\n  bookingRange {\\n    maximum\\n    minimum\\n    __typename\\n  }\\n  header {\\n    subTitle\\n    title\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment TierFragment on RVWebCommonProductTier {\\n  products {\\n    ...ProductFragment\\n    __typename\\n  }\\n  title\\n  __typename\\n}\\n\\nfragment ProductFragment on RVWebCommonProduct {\\n  badges {\\n    ...BadgesFragment\\n    __typename\\n  }\\n  cityID\\n  currencyCode\\n  description\\n  detailedDescription\\n  discountPrimary\\n  displayName\\n  estimatedTripTime\\n  etaStringShort\\n  fares {\\n    capacity\\n    discountPrimary\\n    fare\\n    fareAmountE5\\n    hasPromo\\n    hasRidePass\\n    meta\\n    preAdjustmentValue\\n    __typename\\n  }\\n  hasPromo\\n  hasRidePass\\n  hourly {\\n    tiers {\\n      ...HourlyTierFragment\\n      __typename\\n    }\\n    overageRates {\\n      ...HourlyOverageRatesFragment\\n      __typename\\n    }\\n    __typename\\n  }\\n  iconType\\n  id\\n  is3p\\n  isAvailable\\n  legalConsent {\\n    ...ProductLegalConsentFragment\\n    __typename\\n  }\\n  parentProductUuid\\n  preAdjustmentValue\\n  productImageUrl\\n  productUuid\\n  reserveEnabled\\n  __typename\\n}\\n\\nfragment ProductLegalConsentFragment on RVWebCommonProductLegalConsent {\\n  header\\n  image {\\n    url\\n    width\\n    __typename\\n  }\\n  description\\n  enabled\\n  ctaUrl\\n  ctaDisplayString\\n  buttonLabel\\n  showOnce\\n  __typename\\n}\\n\\nfragment HourlyOverageRatesFragment on RVWebCommonHourlyOverageRates {\\n  perDistanceUnit\\n  perTemporalUnit\\n  __typename\\n}\\n"}`,
        method: "POST",
        credentials: "same-origin",
      })
      .pipe(map((data) => this.transformUberResponse(data)));
  }

  private transformUberResponse(uberResponse: UberGetCabs): GetCabsRespose {
    const rides: Record<string, RideCategory> = {};

    uberResponse.data.tiers.forEach((tier) => {
      tier.products.forEach((product) => {
        rides[product.displayName.toLowerCase()] = {
          fareId: product.id,
          price: product.fares[0]?.fare,
          currencyCode: product.currencyCode,
          estimatedTripTime: product.estimatedTripTime,
          eta: product.etaStringShort,
          capacity: product.fares[0]?.capacity,
          isAvailable: product.isAvailable,
          description: product.description,
          detailedDescription: product.detailedDescription,
        };
      });
    });

    return {
      vendorName: "Uber",
      rides,
    };
  }

  bookCab(source: LngLat, destination: LngLat, rideCategory: string) {
    throw new Error("Method not implemented.");
  }
}
