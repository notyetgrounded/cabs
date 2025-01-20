interface AutoApplyCoupon {
    code: string; // Example: ""
    text: string; // Example: ""
  }
  
  interface RideEstimate {
    amount: string; // Example: "₹87"
    fareId: string; // Example: "2c388313-d1f4-4f1e-8d78-5be3d8aedd28"
    autoApplyCoupon: AutoApplyCoupon; // Object containing `code` and `text`
  }
  
  interface RideData {
    id: string; // Example: "auto"
    displayName: string; // Example: "Auto"
    rideEstimate: RideEstimate; // Instance of RideEstimate
  }
  
  export interface OlaPreBook {
    data: RideData | null; // Instance of RideData, or null if there's no data
    error: any; // Could be `null` or an error object (adjust type as needed)
  }
  