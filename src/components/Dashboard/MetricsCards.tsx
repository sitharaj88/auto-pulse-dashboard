import React from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StarIcon from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import type { SalesMetrics } from "../../types";

const MetricCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}));

const MetricAvatar = styled(Avatar)(({ theme }) => ({
  width: 56,
  height: 56,
  marginBottom: theme.spacing(1),
}));

interface MetricsCardsProps {
  metrics: SalesMetrics;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const metricsData = [
    {
      title: "Total Sales",
      value: metrics.totalSales.toLocaleString(),
      icon: <ShoppingCartIcon />,
      color: "#1976d2",
      bgcolor: "rgba(25, 118, 210, 0.1)",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(metrics.totalRevenue),
      icon: <AttachMoneyIcon />,
      color: "#2e7d32",
      bgcolor: "rgba(46, 125, 50, 0.1)",
    },
    {
      title: "Average Sale Price",
      value: formatCurrency(metrics.averageSalePrice),
      icon: <AccountBalanceWalletIcon />,
      color: "#ed6c02",
      bgcolor: "rgba(237, 108, 2, 0.1)",
    },
    {
      title: "Total Profit",
      value: formatCurrency(metrics.totalProfit),
      icon: <TrendingUpIcon />,
      color: "#9c27b0",
      bgcolor: "rgba(156, 39, 176, 0.1)",
    },
    {
      title: "Conversion Rate",
      value: formatPercentage(metrics.conversionRate),
      icon: <StarIcon />,
      color: "#d32f2f",
      bgcolor: "rgba(211, 47, 47, 0.1)",
    },
    {
      title: "Top Brand",
      value: metrics.topSellingBrand || "N/A",
      icon: <EmojiEventsIcon />,
      color: "#f57c00",
      bgcolor: "rgba(245, 124, 0, 0.1)",
    },
  ];

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
      {metricsData.map((metric, index) => (
        <Grid item xs={6} sm={4} md={4} lg={2} xl={2} key={index}>
          <MetricCard>
            <CardContent
              sx={{
                textAlign: "center",
                py: { xs: 2, sm: 3 },
                px: { xs: 1, sm: 2 },
              }}
            >
              <MetricAvatar
                sx={{
                  bgcolor: metric.bgcolor,
                  color: metric.color,
                  mx: "auto",
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                }}
              >
                {metric.icon}
              </MetricAvatar>
              <Typography
                variant="h5"
                component="div"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.5rem" },
                  mt: { xs: 1, sm: 1.5 },
                }}
              >
                {metric.value}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {metric.title}
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsCards;
