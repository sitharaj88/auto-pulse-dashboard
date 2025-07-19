import type {
  Vehicle,
  SaleRecord,
  SalesMetrics,
  FilterOptions,
} from "../types";

// Helper functions for random data generation
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (
  min: number,
  max: number,
  decimals: number = 2
): number => {
  const random = Math.random() * (max - min) + min;
  return Math.round(random * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

const getRandomDate = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Brand configurations
const CAR_BRANDS = [
  "Toyota",
  "Honda",
  "BMW",
  "Mercedes",
  "Audi",
  "Ford",
  "Nissan",
  "Volkswagen",
];
const BIKE_BRANDS = [
  "Yamaha",
  "Honda",
  "Kawasaki",
  "Suzuki",
  "BMW",
  "Ducati",
  "Harley-Davidson",
  "KTM",
];
const CAR_MODELS = [
  "Sedan LX",
  "SUV Pro",
  "Hatchback GT",
  "Coupe Sport",
  "Wagon Deluxe",
];
const BIKE_MODELS = [
  "Street 250",
  "Cruiser 500",
  "Sport 750",
  "Adventure 1000",
  "Touring 1200",
];
const REGIONS = [
  "North America",
  "Europe",
  "Asia",
  "South America",
  "Australia",
  "Africa",
];
const COLORS = [
  "Red",
  "Blue",
  "Black",
  "White",
  "Silver",
  "Gray",
  "Green",
  "Yellow",
];
const FUEL_TYPES = ["Gasoline", "Diesel", "Electric", "Hybrid"];
const PAYMENT_METHODS = ["cash", "finance", "lease"] as (
  | "cash"
  | "finance"
  | "lease"
)[];
const FIRST_NAMES = [
  "John",
  "Jane",
  "Mike",
  "Sarah",
  "David",
  "Lisa",
  "Chris",
  "Emma",
  "Robert",
  "Maria",
];
const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
];

// Generate mock vehicles
function generateVehicles(count: number = 100): Vehicle[] {
  const vehicles: Vehicle[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomElement(["car", "bike"] as const);
    const brands = type === "car" ? CAR_BRANDS : BIKE_BRANDS;
    const models = type === "car" ? CAR_MODELS : BIKE_MODELS;
    const brand = getRandomElement(brands);
    const model = getRandomElement(models);

    const vehicle: Vehicle = {
      id: generateUUID(),
      brand,
      model: `${brand} ${model}`,
      type,
      price:
        type === "car"
          ? getRandomNumber(15000, 80000)
          : getRandomNumber(3000, 25000),
      year: getRandomNumber(2020, 2024),
      color: getRandomElement(COLORS),
      fuelType: getRandomElement(FUEL_TYPES),
      transmission:
        type === "car" ? getRandomElement(["Manual", "Automatic"]) : undefined,
      engineCapacity:
        type === "car"
          ? getRandomNumber(1000, 4000)
          : getRandomNumber(125, 1000),
    };

    vehicles.push(vehicle);
  }

  return vehicles;
}

// Generate mock sales data
function generateSalesData(
  vehicles: Vehicle[],
  count: number = 500
): SaleRecord[] {
  const salesData: SaleRecord[] = [];

  for (let i = 0; i < count; i++) {
    const vehicle = getRandomElement(vehicles);
    const basePrice = vehicle.price;
    const discount = getRandomNumber(0, 15) / 100;
    const salePrice = basePrice * (1 - discount);
    const profit = salePrice * getRandomFloat(0.05, 0.25);

    const saleRecord: SaleRecord = {
      id: generateUUID(),
      vehicleId: vehicle.id,
      vehicle,
      saleDate: getRandomDate(new Date("2024-01-01"), new Date()).toISOString(),
      salePrice,
      salesPersonId: generateUUID(),
      salesPersonName: `${getRandomElement(FIRST_NAMES)} ${getRandomElement(
        LAST_NAMES
      )}`,
      customerName: `${getRandomElement(FIRST_NAMES)} ${getRandomElement(
        LAST_NAMES
      )}`,
      customerEmail: `${getRandomElement(
        FIRST_NAMES
      ).toLowerCase()}.${getRandomElement(LAST_NAMES).toLowerCase()}@email.com`,
      region: getRandomElement(REGIONS),
      paymentMethod: getRandomElement(PAYMENT_METHODS),
      discount: discount * 100,
      profit,
    };

    salesData.push(saleRecord);
  }

  return salesData.sort(
    (a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime()
  );
}

// Calculate sales metrics (optimized single-pass)
function calculateMetrics(salesData: SaleRecord[]): SalesMetrics {
  if (salesData.length === 0) {
    return {
      totalSales: 0,
      totalRevenue: 0,
      averageSalePrice: 0,
      totalProfit: 0,
      conversionRate: 0,
      topSellingBrand: "",
      topSellingModel: "",
    };
  }

  const totalSales = salesData.length;
  let totalRevenue = 0;
  let totalProfit = 0;
  const brandCounts: Record<string, number> = {};
  const modelCounts: Record<string, number> = {};

  // Single pass through data for all calculations
  salesData.forEach((sale) => {
    totalRevenue += sale.salePrice;
    totalProfit += sale.profit;
    brandCounts[sale.vehicle.brand] =
      (brandCounts[sale.vehicle.brand] || 0) + 1;
    modelCounts[sale.vehicle.model] =
      (modelCounts[sale.vehicle.model] || 0) + 1;
  });

  const averageSalePrice = totalRevenue / totalSales;

  // Find top selling brand and model
  const topSellingBrand =
    Object.entries(brandCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "";

  const topSellingModel =
    Object.entries(modelCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "";

  return {
    totalSales,
    totalRevenue,
    averageSalePrice,
    totalProfit,
    conversionRate: getRandomFloat(0.15, 0.35), // Cached random value for demo
    topSellingBrand,
    topSellingModel,
  };
}

// Filter sales data based on filters
function filterSalesData(
  salesData: SaleRecord[],
  filters: Partial<FilterOptions>
): SaleRecord[] {
  let filtered = [...salesData];

  if (filters.vehicleType && filters.vehicleType !== "all") {
    filtered = filtered.filter(
      (sale) => sale.vehicle.type === filters.vehicleType
    );
  }

  if (filters.brand) {
    filtered = filtered.filter((sale) =>
      sale.vehicle.brand.toLowerCase().includes(filters.brand!.toLowerCase())
    );
  }

  if (filters.region) {
    filtered = filtered.filter((sale) =>
      sale.region.toLowerCase().includes(filters.region!.toLowerCase())
    );
  }

  if (filters.dateRange?.startDate && filters.dateRange?.endDate) {
    filtered = filtered.filter((sale) => {
      const saleDate = new Date(sale.saleDate);
      return (
        saleDate >= filters.dateRange!.startDate! &&
        saleDate <= filters.dateRange!.endDate!
      );
    });
  }

  if (filters.priceRange) {
    filtered = filtered.filter(
      (sale) =>
        sale.salePrice >= filters.priceRange!.min &&
        sale.salePrice <= filters.priceRange!.max
    );
  }

  return filtered;
}

// Simple cache for mock data to avoid regeneration
let dataCache: {
  vehicles: Vehicle[];
  salesData: SaleRecord[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 30000; // 30 seconds cache

// Main function to generate mock data
export function generateMockData(filters?: Partial<FilterOptions>) {
  const now = Date.now();

  // Check if we have valid cached data
  if (dataCache && now - dataCache.timestamp < CACHE_DURATION && !filters) {
    const metrics = calculateMetrics(dataCache.salesData);
    return {
      salesData: dataCache.salesData,
      vehicles: dataCache.vehicles,
      metrics,
    };
  }

  // Generate new data
  const vehicles = generateVehicles(50); // Reduced from 100 to 50
  let salesData = generateSalesData(vehicles, 250); // Reduced from 500 to 250

  // Cache the unfiltered data
  if (!filters) {
    dataCache = {
      vehicles,
      salesData,
      timestamp: now,
    };
  }

  if (filters) {
    salesData = filterSalesData(salesData, filters);
  }

  const metrics = calculateMetrics(salesData);

  return {
    vehicles,
    salesData,
    metrics,
  };
}

// Export individual functions for testing
export {
  generateVehicles,
  generateSalesData,
  calculateMetrics,
  filterSalesData,
};
