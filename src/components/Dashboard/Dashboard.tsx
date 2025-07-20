import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSalesData } from "../../store/slices/dashboardSlice";
import SideDrawer from "../common/SideDrawer";
import AdvancedFilters from "./AdvancedFilters";
import MetricsCards from "./MetricsCards";
import ChartsSection from "./ChartsSection";
import DataTable from "./DataTable";

const EXPANDED_CONTENT_MARGIN = 0; // Main content margin when drawer is expanded

const Root = styled("div")({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f8fafc",
});

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{
  collapsed?: boolean;
}>(({ theme, collapsed }) => ({
  flexGrow: 1,
  overflow: "hidden",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.up("md")]: {
    marginLeft: collapsed ? EXPANDED_CONTENT_MARGIN : EXPANDED_CONTENT_MARGIN, // Uses 80px for overlay effect
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "collapsed",
})<{
  collapsed?: boolean;
}>(({ theme, collapsed }) => ({
  zIndex: theme.zIndex.drawer + 1, // Back to normal z-index
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background:
    "linear-gradient(135deg, rgba(25, 118, 210, 0.95) 0%, rgba(220, 0, 78, 0.95) 100%)",
  backdropFilter: "blur(20px)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: {
    width: collapsed ? "calc(100% - 64px)" : "calc(100% - 240px)", // Always leave space for drawer
    marginLeft: collapsed ? 64 : 240, // Always have margin for drawer width
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 0,
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
  width: "100%",
  maxWidth: "100%",
  overflow: "auto",
}));

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { salesData, filters, isLoading, error } = useAppSelector(
    (state) => state.dashboard
  );
  const { user } = useAppSelector((state) => state.auth);

  const [selectedView, setSelectedView] = useState<string>("overview");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Client-side filtered data to prevent page refresh
  const filteredData = useCallback(() => {
    if (!salesData || salesData.length === 0) return [];

    return salesData.filter((item) => {
      // Filter by vehicle type
      if (filters.vehicleType && filters.vehicleType !== "all") {
        if (item.vehicle.type !== filters.vehicleType) return false;
      }

      // Filter by brand
      if (filters.brand && filters.brand.trim() !== "") {
        if (!item.vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
      }

      // Filter by region
      if (filters.region && filters.region.trim() !== "") {
        if (item.region !== filters.region) return false;
      }

      // Filter by date range
      if (filters.dateRange?.startDate || filters.dateRange?.endDate) {
        const itemDate = new Date(item.saleDate);
        if (filters.dateRange.startDate && itemDate < filters.dateRange.startDate) return false;
        if (filters.dateRange.endDate && itemDate > filters.dateRange.endDate) return false;
      }

      // Filter by price range
      if (filters.priceRange) {
        if (item.salePrice < filters.priceRange.min || item.salePrice > filters.priceRange.max) return false;
      }

      return true;
    });
  }, [salesData, filters]);

  // Show temporary filtering indicator
  useEffect(() => {
    setIsFiltering(true);
    const timeout = setTimeout(() => {
      setIsFiltering(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [filters]);

  // Calculate metrics from filtered data
  const filteredMetrics = useCallback(() => {
    const filtered = filteredData();
    if (filtered.length === 0) {
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

    const totalSales = filtered.length;
    const totalRevenue = filtered.reduce((sum, item) => sum + item.salePrice, 0);
    const averageSalePrice = totalRevenue / totalSales;
    const totalProfit = filtered.reduce((sum, item) => sum + item.profit, 0);

    // Find top selling brand
    const brandCounts = filtered.reduce((acc, item) => {
      acc[item.vehicle.brand] = (acc[item.vehicle.brand] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topSellingBrand = Object.entries(brandCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || "";

    // Find top selling model
    const modelCounts = filtered.reduce((acc, item) => {
      acc[item.vehicle.model] = (acc[item.vehicle.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topSellingModel = Object.entries(modelCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || "";

    return {
      totalSales,
      totalRevenue,
      averageSalePrice,
      totalProfit,
      conversionRate: (totalSales / (totalSales + 50)) * 100, // Mock conversion rate
      topSellingBrand,
      topSellingModel,
    };
  }, [filteredData]);

  // Initial data fetch only once when component mounts
  useEffect(() => {
    dispatch(fetchSalesData());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleDrawerCollapse = (collapsed: boolean) => {
    setDrawerCollapsed(collapsed);
  };

  const handleViewChange = (view: string) => {
    setSelectedView(view);
  };

  const renderAnalyticsContent = () => {
    const filteredSalesData = filteredData();
    const currentMetrics = filteredMetrics();
    
    // Show subtle filtering indicator
    const contentStyle = {
      position: 'relative' as const,
      opacity: isFiltering ? 0.7 : 1,
      transition: 'opacity 0.3s ease-in-out',
      pointerEvents: isFiltering ? 'none' as const : 'auto' as const,
    };
    
    switch (selectedView) {
      case "overview":
        return (
          <Box sx={contentStyle}>
            <Box sx={{ mb: 3 }}>
              <MetricsCards metrics={currentMetrics} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <ChartsSection salesData={filteredSalesData} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <DataTable salesData={filteredSalesData} />
            </Box>
          </Box>
        );
      case "sales-trends":
        return (
          <Box sx={contentStyle}>
            <Box sx={{ mb: 3 }}>
              <MetricsCards metrics={currentMetrics} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <ChartsSection salesData={filteredSalesData} />
            </Box>
          </Box>
        );
      case "performance":
        return (
          <Box sx={contentStyle}>
            <MetricsCards metrics={currentMetrics} />
          </Box>
        );
      case "data-table":
        return (
          <Box sx={contentStyle}>
            <DataTable salesData={filteredSalesData} />
          </Box>
        );
      case "detailed-charts":
        return (
          <Box sx={contentStyle}>
            <ChartsSection salesData={filteredSalesData} />
          </Box>
        );
      default:
        return (
          <Box sx={contentStyle}>
            <Box sx={{ mb: 3 }}>
              <MetricsCards metrics={currentMetrics} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <ChartsSection salesData={filteredSalesData} />
            </Box>
          </Box>
        );
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Root>
      {/* App Bar */}
      <StyledAppBar position="fixed" collapsed={drawerCollapsed}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              mr: 2,
              display: { xs: "inline-flex", md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            AutoPulse Dashboard -{" "}
            {selectedView
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </Typography>
          {user && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontSize: { sm: "0.875rem", md: "0.875rem" },
                }}
              >
                Welcome, {user.firstName} {user.lastName}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Side Drawer */}
      <SideDrawer
        open={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        selectedView={selectedView}
        onViewChange={handleViewChange}
        onCollapse={handleDrawerCollapse}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <Main collapsed={drawerCollapsed}>
        <Toolbar />
        
        <ContentWrapper>
          <Container maxWidth={false} sx={{ p: 0 }}>
            {/* Advanced Filters */}
            <Box sx={{ mb: 3 }}>
              <AdvancedFilters />
            </Box>

            {/* Dynamic Content */}
            {renderAnalyticsContent()}
          </Container>
        </ContentWrapper>
      </Main>
    </Root>
  );
};

export default Dashboard;
