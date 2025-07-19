import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DashboardState, FilterOptions } from "../../types";
import { generateMockData } from "../../services/mockDataService";

// Async thunks
export const fetchSalesData = createAsyncThunk(
  "dashboard/fetchSalesData",
  async (filters?: Partial<FilterOptions>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return generateMockData(filters);
  }
);

// Initial state
const initialState: DashboardState = {
  salesData: [],
  vehicles: [],
  metrics: {
    totalSales: 0,
    totalRevenue: 0,
    averageSalePrice: 0,
    totalProfit: 0,
    conversionRate: 0,
    topSellingBrand: "",
    topSellingModel: "",
  },
  filters: {
    vehicleType: "all",
    dateRange: {
      startDate: null,
      endDate: null,
    },
    brand: "",
    region: "",
    priceRange: {
      min: 0,
      max: 100000,
    },
  },
  isLoading: false,
  error: null,
};

// Dashboard slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<FilterOptions>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesData = action.payload.salesData;
        state.vehicles = action.payload.vehicles;
        state.metrics = action.payload.metrics;
        state.error = null;
      })
      .addCase(fetchSalesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch sales data";
      });
  },
});

export const { setFilters, clearFilters, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
