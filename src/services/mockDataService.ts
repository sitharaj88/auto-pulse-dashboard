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
      saleDate: getRandomDate(new Date("2024-01-01"), new Date()),
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

  return salesData.sort((a, b) => b.saleDate.getTime() - a.saleDate.getTime());
}

// Calculate sales metrics
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
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.salePrice, 0);
  const totalProfit = salesData.reduce((sum, sale) => sum + sale.profit, 0);
  const averageSalePrice = totalRevenue / totalSales;

  // Calculate top selling brand
  const brandCounts = salesData.reduce((counts, sale) => {
    counts[sale.vehicle.brand] = (counts[sale.vehicle.brand] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  const topSellingBrand =
    Object.entries(brandCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "";

  // Calculate top selling model
  const modelCounts = salesData.reduce((counts, sale) => {
    counts[sale.vehicle.model] = (counts[sale.vehicle.model] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  const topSellingModel =
    Object.entries(modelCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "";

  return {
    totalSales,
    totalRevenue,
    averageSalePrice,
    totalProfit,
    conversionRate: getRandomFloat(0.15, 0.35),
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
    filtered = filtered.filter(
      (sale) =>
        sale.saleDate >= filters.dateRange!.startDate! &&
        sale.saleDate <= filters.dateRange!.endDate!
    );
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

// Main function to generate mock data
export function generateMockData(filters?: Partial<FilterOptions>) {
  const vehicles = generateVehicles(100);
  let salesData = generateSalesData(vehicles, 500);

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
