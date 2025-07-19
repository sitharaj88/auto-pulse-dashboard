import React, { useEffect } from "react";
import { Container, Box, CircularProgress, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSalesData } from "../../store/slices/dashboardSlice";
import DashboardHeader from "./DashboardHeader";
import MetricsCards from "./MetricsCards";
import ChartsSection from "./ChartsSection";
import DataTable from "./DataTable";

const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  [theme.breakpoints.up("xl")]: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
}));

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { salesData, metrics, isLoading, error } = useAppSelector(
    (state) => state.dashboard
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchSalesData());
  }, [dispatch]);

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
    <Box sx={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <DashboardHeader user={user} />

      <DashboardContainer maxWidth={false} disableGutters>
        <Box
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "1200px",
              lg: "1400px",
              xl: "1600px",
            },
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Box sx={{ mt: { xs: 2, md: 3 } }}>
            <MetricsCards metrics={metrics} />
          </Box>

          <Box sx={{ mt: { xs: 3, md: 4 } }}>
            <ChartsSection salesData={salesData} />
          </Box>

          <Box sx={{ mt: { xs: 3, md: 4 }, pb: { xs: 2, md: 3 } }}>
            <DataTable salesData={salesData} />
          </Box>
        </Box>
      </DashboardContainer>
    </Box>
  );
};

export default Dashboard;
