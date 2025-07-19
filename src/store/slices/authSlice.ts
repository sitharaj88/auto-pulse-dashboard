import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthState } from "../../types";

// Mock authentication service
const mockAuthService = {
  login: async (username: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === "admin" && password === "admin123") {
      return {
        id: "1",
        username: "admin",
        email: "admin@dashboard.com",
        role: "admin",
        firstName: "Admin",
        lastName: "User",
        avatar: "https://i.pravatar.cc/150?img=1",
      };
    } else if (username === "manager" && password === "manager123") {
      return {
        id: "2",
        username: "manager",
        email: "manager@dashboard.com",
        role: "manager",
        firstName: "Manager",
        lastName: "User",
        avatar: "https://i.pravatar.cc/150?img=2",
      };
    } else if (username === "analyst" && password === "analyst123") {
      return {
        id: "3",
        username: "analyst",
        email: "analyst@dashboard.com",
        role: "analyst",
        firstName: "Analyst",
        lastName: "User",
        avatar: "https://i.pravatar.cc/150?img=3",
      };
    } else {
      throw new Error("Invalid credentials");
    }
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
  },
};

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const user = await mockAuthService.login(username, password);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await mockAuthService.logout();
  localStorage.removeItem("user");
});

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    checkAuthStatus: (state) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
        state.isAuthenticated = false;
        state.user = null;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Logout failed";
      });
  },
});

export const { clearError, checkAuthStatus } = authSlice.actions;
export default authSlice.reducer;
