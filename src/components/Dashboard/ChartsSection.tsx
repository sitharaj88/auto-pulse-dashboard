import React, { useMemo } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import type { SaleRecord } from "../../types";

// Register Chart.js components - ensure all components are registered
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Colors
);

interface ChartsSectionProps {
  salesData: SaleRecord[];
}

// Chart.js default options for consistent styling
const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      cornerRadius: 8,
      padding: 12,
    },
  },
  animation: {
    duration: 1000,
  },
};

const ChartsSection: React.FC<ChartsSectionProps> = ({ salesData }) => {
  // Monthly Sales Volume Data
  const salesByMonth = useMemo(() => {
    const monthlyData: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate);
      const month = saleDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    const labels = Object.keys(monthlyData).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return {
      labels,
      datasets: [
        {
          label: "Sales Volume",
          data: labels.map((month) => monthlyData[month]),
          backgroundColor: "rgba(25, 118, 210, 0.8)",
          borderColor: "rgba(25, 118, 210, 1)",
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [salesData]);

  // Vehicle Type Distribution
  const salesByType = useMemo(() => {
    const typeData: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      const type = sale.vehicle.type === "car" ? "Cars" : "Bikes";
      typeData[type] = (typeData[type] || 0) + 1;
    });

    return {
      labels: Object.keys(typeData),
      datasets: [
        {
          data: Object.values(typeData),
          backgroundColor: ["rgba(25, 118, 210, 0.8)", "rgba(220, 0, 78, 0.8)"],
          borderColor: ["rgba(25, 118, 210, 1)", "rgba(220, 0, 78, 1)"],
          borderWidth: 3,
          hoverOffset: 20,
        },
      ],
    };
  }, [salesData]);

  // Revenue by Brand (Top 8)
  const revenueByBrand = useMemo(() => {
    const brandRevenue: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      const brand = sale.vehicle.brand;
      brandRevenue[brand] = (brandRevenue[brand] || 0) + sale.salePrice;
    });

    const sortedBrands = Object.entries(brandRevenue)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    const labels = sortedBrands.map(([brand]) => brand);
    const data = sortedBrands.map(([, revenue]) => revenue);

    return {
      labels,
      datasets: [
        {
          label: "Revenue ($)",
          data,
          backgroundColor: "rgba(220, 0, 78, 0.8)",
          borderColor: "rgba(220, 0, 78, 1)",
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [salesData]);

  // Monthly Revenue Trend
  const monthlyRevenue = useMemo(() => {
    const monthlyData: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate);
      const month = saleDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
      monthlyData[month] = (monthlyData[month] || 0) + sale.salePrice;
    });

    const labels = Object.keys(monthlyData).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return {
      labels,
      datasets: [
        {
          label: "Revenue ($)",
          data: labels.map((month) => monthlyData[month]),
          borderColor: "rgba(46, 125, 50, 1)",
          backgroundColor: "rgba(46, 125, 50, 0.1)",
          borderWidth: 4,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "rgba(46, 125, 50, 1)",
          pointBorderColor: "#fff",
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [salesData]);

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {/* Monthly Sales Chart */}
      <Grid item xs={12} lg={6}>
        <Card sx={{ height: "400px" }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              📊 Monthly Sales Volume
            </Typography>
            <Box sx={{ flex: 1, position: "relative", minHeight: 0 }}>
              <Bar
                key="monthly-sales-chart"
                data={salesByMonth}
                options={{
                  ...defaultChartOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0, 0, 0, 0.1)",
                      },
                      ticks: {
                        font: { size: 11 },
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        font: { size: 11 },
                        maxRotation: 45,
                      },
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Vehicle Type Distribution */}
      <Grid item xs={12} lg={6}>
        <Card sx={{ height: "400px" }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              🚗 Sales by Vehicle Type
            </Typography>
            <Box sx={{ flex: 1, position: "relative", minHeight: 0 }}>
              <Doughnut
                key="vehicle-type-chart"
                data={salesByType}
                options={{
                  ...defaultChartOptions,
                  cutout: "60%",
                  plugins: {
                    ...defaultChartOptions.plugins,
                    legend: {
                      ...defaultChartOptions.plugins.legend,
                      position: "bottom" as const,
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Revenue by Brand */}
      <Grid item xs={12} lg={6}>
        <Card sx={{ height: "400px" }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              🏆 Top Brands by Revenue
            </Typography>
            <Box sx={{ flex: 1, position: "relative", minHeight: 0 }}>
              <Bar
                key="brand-revenue-chart"
                data={revenueByBrand}
                options={{
                  ...defaultChartOptions,
                  indexAxis: "y" as const,
                  scales: {
                    x: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0, 0, 0, 0.1)",
                      },
                      ticks: {
                        font: { size: 10 },
                        callback: function (value) {
                          return new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          }).format(value as number);
                        },
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        font: { size: 11 },
                      },
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Revenue Trend */}
      <Grid item xs={12} lg={6}>
        <Card sx={{ height: "400px" }}>
          <CardContent
            sx={{
              p: { xs: 2, sm: 3 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              📈 Monthly Revenue Trend
            </Typography>
            <Box sx={{ flex: 1, position: "relative", minHeight: 0 }}>
              <Line
                key="monthly-revenue-chart"
                data={monthlyRevenue}
                options={{
                  ...defaultChartOptions,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0, 0, 0, 0.1)",
                      },
                      ticks: {
                        font: { size: 11 },
                        callback: function (value) {
                          return new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            minimumFractionDigits: 0,
                          }).format(value as number);
                        },
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        font: { size: 11 },
                        maxRotation: 45,
                      },
                    },
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
