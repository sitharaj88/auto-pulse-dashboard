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

const COLLAPSED_DRAWER_WIDTH = 64;
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
