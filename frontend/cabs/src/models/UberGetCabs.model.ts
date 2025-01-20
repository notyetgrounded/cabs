interface Product {
  badges: string[];
  cityID: string;
  currencyCode: string;
  description: string;
  detailedDescription: string;
  discountPrimary: string;
  displayName: string;
  estimatedTripTime: number;
  etaStringShort: string;
  fares: Fare[];
  hasPromo: boolean;
  hasRidePass: boolean;
  meta: string;
  preAdjustmentValue: string;
  productImageUrl: string;
  productUuid: string;
  reserveEnabled: boolean;
  isAvailable: boolean;
  iconType: string;
  id: string;
  is3p: boolean;
  legalConsent: string | null;
  parentProductUuid: string;
  vehicleViewID: number;
  hourly: null | string;
  title: string;
  __typename: string;
}

interface Fare {
  capacity: number;
  fare: string;
  fareAmountE5: number;
  hasPromo: boolean;
  hasRidePass: boolean;
  meta: string;
  productUuid: string;
  upfrontFare: UpfrontFare;
  surgeMultiplier: number;
}

interface UpfrontFare {
  capacity: number;
  currencyCode: string;
  destinationLat: number;
  destinationLng: number;
  fare: string;
  originLat: number;
  originLng: number;
  signature: FareSignature;
  vehicleViewId: number;
  uuid: string;
  estimatedDuration: null | string;
  estimatedDistance: null | string;
  dynamicFareInfo: DynamicFareInfo;
}

interface FareSignature {
  expiresAt: number;
  issuedAt: number;
  signature: string;
  version: string;
}

interface DynamicFareInfo {
  isSobriety: boolean;
  multiplier: number;
  surgeSuppressionThreshold: number;
  uuid: string;
}

interface ProductTier {
  products: Product[];
  title: string;
  __typename: string;
}

interface RVWebCommonProductsResponse {
  defaultVVID: string;
  hourlyTiersWithMinimumFare: any[]; // Assuming the type is not provided
  intercity: null | string;
  links: any[]; // Assuming the type is not provided
  productsUnavailableMessage: string;
  tiers: ProductTier[];
}

export interface UberGetCabs {
  data: RVWebCommonProductsResponse;
}
