interface RideCategory {
  fareId: string;
  price: string;
}

interface P2PData {
  categories: Record<string, RideCategory>; // Dynamic keys for categories
}
export interface OlaGetCabs {
  data: P2PData;
  error: string | null; // Null if no error, otherwise contains error details
}
