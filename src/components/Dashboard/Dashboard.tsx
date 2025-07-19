import React, { useEffect, useState } from "react";
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

const DRAWER_WIDTH = 280;
const COLLAPSED_DRAWER_WIDTH = 64;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "collapsed",
})<{
  open?: boolean;
  collapsed?: boolean;
}>(({ theme, collapsed }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: 0,
  [theme.breakpoints.up("md")]: {
    marginLeft: collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
    padding: theme.spacing(2),
  },
  minHeight: "100vh",
  backgroundColor: "transparent",
}));

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "collapsed" && prop !== "drawerOpen",
})<{
  collapsed?: boolean;
  drawerOpen?: boolean;
}>(({ theme, collapsed }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background:
    "linear-gradient(135deg, rgba(25, 118, 210, 0.95) 0%, rgba(220, 0, 78, 0.95) 100%)",
  backdropFilter: "blur(20px)",
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: {
    width: `calc(100% - ${
      collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH
    }px)`,
    marginLeft: collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
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

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { salesData, metrics, filters, isLoading, error } = useAppSelector(
    (state) => state.dashboard
  );
  const { user } = useAppSelector((state) => state.auth);

  const [selectedView, setSelectedView] = useState<string>("overview");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch(fetchSalesData(filters));
  }, [dispatch, filters]);

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
    switch (selectedView) {
      case "overview":
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <MetricsCards metrics={metrics} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <ChartsSection salesData={salesData} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <DataTable salesData={salesData} />
            </Box>
          </>
        );
      case "sales-trends":
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <MetricsCards metrics={metrics} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <ChartsSection salesData={salesData} />
            </Box>
          </>
        );
      case "performance":
        return (
          <Box sx={{ mb: 3 }}>
            <MetricsCards metrics={metrics} />
          </Box>
        );
      case "data-table":
        return (
          <Box sx={{ mb: 3 }}>
            <DataTable salesData={salesData} />
          </Box>
        );
      case "detailed-charts":
        return (
          <Box sx={{ mb: 3 }}>
            <ChartsSection salesData={salesData} />
          </Box>
        );
      default:
        return (
          <>
            <Box sx={{ mb: 3 }}>
              <MetricsCards metrics={metrics} />
            </Box>
            <Box sx={{ mb: 3 }}>
              <ChartsSection salesData={salesData} />
            </Box>
          </>
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
    <Box
      sx={{ display: "flex", backgroundColor: "#f8fafc", minHeight: "100vh" }}
    >
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

        <Container maxWidth="xl" sx={{ mt: 2 }}>
          {/* Advanced Filters */}
          <AdvancedFilters />

          {/* Dynamic Content */}
          {renderAnalyticsContent()}
        </Container>
      </Main>
    </Box>
  );
};

export default Dashboard;
