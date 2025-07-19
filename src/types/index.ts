// Vehicle Types
export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  type: "car" | "bike";
  price: number;
  year: number;
  color: string;
  fuelType: string;
  transmission?: string;
  engineCapacity?: number;
}

// Sales Data Types
export interface SaleRecord {
  id: string;
  vehicleId: string;
  vehicle: Vehicle;
  saleDate: string; // Changed to string for Redux serialization
  salePrice: number;
  salesPersonId: string;
  salesPersonName: string;
  customerName: string;
  customerEmail: string;
  region: string;
  paymentMethod: "cash" | "finance" | "lease";
  discount: number;
  profit: number;
}

// Analytics Types
export interface SalesMetrics {
  totalSales: number;
  totalRevenue: number;
  averageSalePrice: number;
  totalProfit: number;
  conversionRate: number;
  topSellingBrand: string;
  topSellingModel: string;
}

export interface ChartData {
  name: string;
  value: number;
  cars?: number;
  bikes?: number;
  revenue?: number;
  profit?: number;
}

// Filter Types
export interface FilterOptions {
  vehicleType: "all" | "car" | "bike";
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  brand: string;
  region: string;
  priceRange: {
    min: number;
    max: number;
  };
}

// User Authentication Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "manager" | "analyst";
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Dashboard State Types
export interface DashboardState {
  salesData: SaleRecord[];
  vehicles: Vehicle[];
  metrics: SalesMetrics;
  filters: FilterOptions;
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}
