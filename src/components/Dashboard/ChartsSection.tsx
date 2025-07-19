import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import type { SaleRecord } from "../../types";

interface ChartsSectionProps {
  salesData: SaleRecord[];
}

const COLORS = [
  "#1976d2",
  "#dc004e",
  "#2e7d32",
  "#ed6c02",
  "#9c27b0",
  "#d32f2f",
];

const ChartsSection: React.FC<ChartsSectionProps> = ({ salesData }) => {
  // Prepare data for charts
  const salesByMonth = React.useMemo(() => {
    const monthlyData: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      const month = sale.saleDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });

    return Object.entries(monthlyData)
      .map(([month, sales]) => ({ month, sales }))
      .sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
      );
  }, [salesData]);

  const salesByType = React.useMemo(() => {
    const typeData = salesData.reduce((acc, sale) => {
      const type = sale.vehicle.type === "car" ? "Cars" : "Bikes";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(typeData).map(([name, value]) => ({ name, value }));
  }, [salesData]);

  const revenueByBrand = React.useMemo(() => {
    const brandData: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      const brand = sale.vehicle.brand;
      brandData[brand] = (brandData[brand] || 0) + sale.salePrice;
    });

    return Object.entries(brandData)
      .map(([brand, revenue]) => ({ brand, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 8); // Top 8 brands
  }, [salesData]);

  const monthlyRevenue = React.useMemo(() => {
    const monthlyData: { [key: string]: number } = {};

    salesData.forEach((sale) => {
      const month = sale.saleDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      monthlyData[month] = (monthlyData[month] || 0) + sale.salePrice;
    });

    return Object.entries(monthlyData)
      .map(([month, revenue]) => ({ month, revenue }))
      .sort(
        (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
      );
  }, [salesData]);

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {/* Monthly Sales Chart */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              Monthly Sales Volume
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  interval={"preserveStartEnd"}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="sales" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Vehicle Type Distribution */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              Sales by Vehicle Type
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={salesByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesByType.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Revenue by Brand */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              Revenue by Brand
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueByBrand} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  dataKey="brand"
                  type="category"
                  width={60}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Bar dataKey="revenue" fill="#dc004e" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Revenue Trend */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
            >
              Monthly Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  interval={"preserveStartEnd"}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2e7d32"
                  strokeWidth={3}
                  dot={{ fill: "#2e7d32", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
