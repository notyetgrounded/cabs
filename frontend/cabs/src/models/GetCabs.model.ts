export interface RideCategory {
  fareId: string; // Identifier for the fare
  price: string; // Price of the ride
  currencyCode?: string; // Optional, present in Uber fares
  estimatedTripTime?: number; // Optional, from Uber
  eta?: string; // Optional, derived from Uber's etaStringShort
  capacity?: number; // Optional, present in Uber
  isAvailable?: boolean; // Optional, from Uber
  description?: string; // Optional, from Uber
  detailedDescription?: string; // Optional, from Uber
}
export interface GetCabsRespose {
  vendorName: string; // Name of the vendor (e.g., Ola, Uber)
  rides: Record<string, RideCategory>; // Dynamic categories
  error?: string | null; // Error, if any
}
