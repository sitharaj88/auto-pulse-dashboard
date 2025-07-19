import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import dashboardSlice from "./slices/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    dashboard: dashboardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["dashboard/setFilters"],
        ignoredPaths: ["dashboard.filters.dateRange"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
