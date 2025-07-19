import React, { useState, useCallback } from "react";
import {
  Box,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Divider,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  DateRange as DateRangeIcon,
  TrendingUp as TrendingUpIcon,
  LocalAtm as LocalAtmIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateFilters, clearFilters } from "../../store/slices/dashboardSlice";
import type { FilterOptions } from "../../types";

const AdvancedFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.dashboard);

  const [expanded, setExpanded] = useState<string | false>("date");
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.priceRange?.min || 0,
    filters.priceRange?.max || 100000,
  ]);

  // Quick date filter presets
  const datePresets = [
    { label: "Today", days: 0 },
    { label: "Last 7 Days", days: 7 },
    { label: "Last 30 Days", days: 30 },
    { label: "Last 3 Months", days: 90 },
    { label: "Last 6 Months", days: 180 },
    { label: "Last Year", days: 365 },
  ];

  const handleAccordionChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: unknown) => {
      dispatch(updateFilters({ [key]: value }));
    },
    [dispatch]
  );

  const handleDatePreset = useCallback(
    (days: number) => {
      const endDate = new Date();
      const startDate =
        days === 0
          ? new Date()
          : new Date(Date.now() - days * 24 * 60 * 60 * 1000);

      handleFilterChange("dateRange", {
        startDate,
        endDate,
      });
    },
    [handleFilterChange]
  );

  const handlePriceRangeChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      const value = newValue as number[];
      setPriceRange(value);
      handleFilterChange("priceRange", {
        min: value[0],
        max: value[1],
      });
    },
    [handleFilterChange]
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
    setPriceRange([0, 100000]);
  }, [dispatch]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.vehicleType && filters.vehicleType !== "all") count++;
    if (filters.brand) count++;
    if (filters.region) count++;
    if (filters.dateRange?.startDate || filters.dateRange?.endDate) count++;
    if (
      filters.priceRange &&
      (filters.priceRange.min > 0 || filters.priceRange.max < 100000)
    )
      count++;
    return count;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        mb: 3,
        borderRadius: 2,
        background:
          "linear-gradient(135deg, rgba(25, 118, 210, 0.02) 0%, rgba(220, 0, 78, 0.02) 100%)",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Advanced Filters
          </Typography>
          {getActiveFiltersCount() > 0 && (
            <Chip
              label={`${getActiveFiltersCount()} active`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ClearIcon />}
          onClick={handleClearFilters}
          disabled={getActiveFiltersCount() === 0}
        >
          Clear All
        </Button>
      </Box>

      <Divider />

      {/* Date Range Filters */}
      <Accordion
        expanded={expanded === "date"}
        onChange={handleAccordionChange("date")}
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DateRangeIcon color="primary" />
            <Typography fontWeight="medium">Date Range Filters</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Quick Date Presets:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {datePresets.map((preset) => (
                  <Chip
                    key={preset.label}
                    label={preset.label}
                    onClick={() => handleDatePreset(preset.days)}
                    variant="outlined"
                    size="small"
                    clickable
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Start Date"
                type="date"
                value={
                  filters.dateRange?.startDate
                    ? filters.dateRange.startDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  handleFilterChange("dateRange", {
                    ...filters.dateRange,
                    startDate: date,
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="End Date"
                type="date"
                value={
                  filters.dateRange?.endDate
                    ? filters.dateRange.endDate.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  handleFilterChange("dateRange", {
                    ...filters.dateRange,
                    endDate: date,
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Vehicle & Brand Filters */}
      <Accordion
        expanded={expanded === "vehicle"}
        onChange={handleAccordionChange("vehicle")}
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TrendingUpIcon color="primary" />
            <Typography fontWeight="medium">Vehicle & Brand Filters</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Vehicle Type</InputLabel>
                <Select
                  value={filters.vehicleType || "all"}
                  label="Vehicle Type"
                  onChange={(e) =>
                    handleFilterChange("vehicleType", e.target.value)
                  }
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="car">Cars Only</MenuItem>
                  <MenuItem value="bike">Bikes Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Brand"
                placeholder="Enter brand name..."
                value={filters.brand || ""}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Region</InputLabel>
                <Select
                  value={filters.region || ""}
                  label="Region"
                  onChange={(e) => handleFilterChange("region", e.target.value)}
                >
                  <MenuItem value="">All Regions</MenuItem>
                  <MenuItem value="North America">North America</MenuItem>
                  <MenuItem value="Europe">Europe</MenuItem>
                  <MenuItem value="Asia">Asia</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                  <MenuItem value="Africa">Africa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Price Range Filter */}
      <Accordion
        expanded={expanded === "price"}
        onChange={handleAccordionChange("price")}
        elevation={0}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocalAtmIcon color="primary" />
            <Typography fontWeight="medium">Price Range Filter</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography gutterBottom>
                Price Range: {formatPrice(priceRange[0])} -{" "}
                {formatPrice(priceRange[1])}
              </Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPrice}
                min={0}
                max={100000}
                step={1000}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 25000, label: "$25K" },
                  { value: 50000, label: "$50K" },
                  { value: 75000, label: "$75K" },
                  { value: 100000, label: "$100K" },
                ]}
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default AdvancedFilters;
