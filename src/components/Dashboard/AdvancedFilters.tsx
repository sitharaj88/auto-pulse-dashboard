import React, { useState, useCallback } from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Chip,
  Typography,
  Slider,
  Stack,
  IconButton,
  Tooltip,
  Collapse,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FilterAlt as FilterIcon,
  Clear as ClearIcon,
  CalendarMonth as CalendarIcon,
  DirectionsCar as CarIcon,
  TwoWheeler as BikeIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateFilters, clearFilters } from "../../store/slices/dashboardSlice";
import type { FilterOptions } from "../../types";

// Styled Components for modern accordion design
const FilterContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.primary.main, 0.02)} 0%, 
    ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: 0, // No rounded borders
  marginBottom: theme.spacing(3),
  backdropFilter: 'blur(10px)',
  boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
  overflow: 'hidden',
}));

const AccordionHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.02),
  },
}));

const AccordionContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: alpha(theme.palette.background.paper, 0.5),
}));

const FilterSection = styled(Box)(({ theme }) => ({
  background: alpha(theme.palette.background.paper, 0.7),
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: 0, // No rounded borders
  padding: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    background: alpha(theme.palette.background.paper, 0.9),
    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.08)}`,
  },
}));

const SectionTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

const DatePresetChip = styled(Chip)(({ theme }) => ({
  borderRadius: 0, // No rounded borders
  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  background: alpha(theme.palette.primary.main, 0.05),
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    borderColor: alpha(theme.palette.primary.main, 0.5),
  },
  '&.MuiChip-clickable': {
    cursor: 'pointer',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 0, // No rounded borders
  minHeight: 40,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  '&:hover': {
    boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 0, // No rounded borders
    background: alpha(theme.palette.background.paper, 0.8),
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.2),
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.3),
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 0, // No rounded borders
    background: alpha(theme.palette.background.paper, 0.8),
    '& fieldset': {
      borderColor: alpha(theme.palette.divider, 0.2),
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.3),
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const AdvancedFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.dashboard);
  const [isExpanded, setIsExpanded] = useState(false);

  const [priceRange, setPriceRange] = useState<number[]>([
    filters.priceRange?.min || 0,
    filters.priceRange?.max || 100000,
  ]);
  const [startDate, setStartDate] = useState<Dayjs | null>(
    filters.dateRange?.startDate ? dayjs(filters.dateRange.startDate) : null
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    filters.dateRange?.endDate ? dayjs(filters.dateRange.endDate) : null
  );

  // Quick date filter presets
  const datePresets = [
    { label: "Today", days: 0 },
    { label: "Last 7 Days", days: 7 },
    { label: "Last 30 Days", days: 30 },
    { label: "Last 3 Months", days: 90 },
    { label: "Last 6 Months", days: 180 },
    { label: "Last Year", days: 365 },
  ];

  const handleFilterChange = useCallback(
    (key: keyof FilterOptions, value: unknown) => {
      dispatch(updateFilters({ [key]: value }));
    },
    [dispatch]
  );

  const handleDatePreset = useCallback(
    (days: number) => {
      const endDateValue = dayjs();
      const startDateValue = days === 0 ? dayjs() : dayjs().subtract(days, 'day');
      
      setStartDate(startDateValue);
      setEndDate(endDateValue);
      
      handleFilterChange("dateRange", {
        startDate: startDateValue.toDate(),
        endDate: endDateValue.toDate(),
      });
    },
    [handleFilterChange]
  );

  const handleStartDateChange = useCallback(
    (newValue: Dayjs | null) => {
      setStartDate(newValue);
      handleFilterChange("dateRange", {
        ...filters.dateRange,
        startDate: newValue?.toDate() || null,
      });
    },
    [handleFilterChange, filters.dateRange]
  );

  const handleEndDateChange = useCallback(
    (newValue: Dayjs | null) => {
      setEndDate(newValue);
      handleFilterChange("dateRange", {
        ...filters.dateRange,
        endDate: newValue?.toDate() || null,
      });
    },
    [handleFilterChange, filters.dateRange]
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
    setStartDate(null);
    setEndDate(null);
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FilterContainer>
        {/* Always Visible Header */}
        <AccordionHeader onClick={() => setIsExpanded(!isExpanded)}>
          {/* Desktop Header */}
          <Box sx={{ 
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center', 
            justifyContent: 'space-between',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FilterIcon sx={{ fontSize: 28, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight="bold" color="text.primary">
                Advanced Filters
              </Typography>
              {getActiveFiltersCount() > 0 && (
                <Chip
                  label={`${getActiveFiltersCount()} filters active`}
                  size="medium"
                  color="primary"
                  variant="filled"
                  sx={{ 
                    borderRadius: 0,
                    fontWeight: 600,
                    px: 1
                  }}
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Stack direction="row" spacing={1}>
                <Tooltip title="Reset all filters">
                  <IconButton 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilters();
                    }}
                    disabled={getActiveFiltersCount() === 0}
                    sx={{ 
                      borderRadius: 0,
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'error.main',
                        color: 'error.main'
                      }
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
                <ActionButton
                  variant="outlined"
                  startIcon={<ClearIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearFilters();
                  }}
                  disabled={getActiveFiltersCount() === 0}
                  color="error"
                  size="small"
                >
                  Clear All
                </ActionButton>
              </Stack>
              <IconButton
                sx={{ 
                  borderRadius: 0,
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                  ml: 1
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Mobile Header */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FilterIcon sx={{ fontSize: 24, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  Advanced Filters
                </Typography>
              </Box>
              <IconButton
                sx={{ 
                  borderRadius: 0,
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease-in-out',
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
            
            {/* Mobile Filter Status & Clear Action */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 0,
              backgroundColor: getActiveFiltersCount() > 0 ? 'primary.50' : 'grey.50',
              border: '1px solid',
              borderColor: getActiveFiltersCount() > 0 ? 'primary.200' : 'grey.200',
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {getActiveFiltersCount() > 0 ? (
                  <>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main' 
                    }} />
                    <Typography variant="body2" fontWeight="medium" color="primary.main">
                      {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} applied
                    </Typography>
                  </>
                ) : (
                  <>
                    <Box sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: 'grey.400' 
                    }} />
                    <Typography variant="body2" color="text.secondary">
                      No filters applied
                    </Typography>
                  </>
                )}
              </Box>

              {getActiveFiltersCount() > 0 && (
                <Chip
                  label="Clear All"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearFilters();
                  }}
                  clickable
                  size="small"
                  deleteIcon={<ClearIcon fontSize="small" />}
                  onDelete={(e) => {
                    e.stopPropagation();
                    handleClearFilters();
                  }}
                  sx={{
                    borderRadius: 0,
                    backgroundColor: 'error.main',
                    color: 'white',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'error.dark',
                    },
                    '& .MuiChip-deleteIcon': {
                      color: 'white',
                      '&:hover': {
                        color: 'grey.200',
                      },
                    },
                  }}
                />
              )}
            </Box>
          </Box>
        </AccordionHeader>

        {/* Collapsible Filter Content */}
        <Collapse in={isExpanded} timeout="auto">
          <AccordionContent>
            <Grid container spacing={3}>
              {/* Date Range Section */}
              <Grid item xs={12}>
                <FilterSection>
                  <SectionTitle>
                    <CalendarIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Date Range Filter
                    </Typography>
                  </SectionTitle>

                  {/* Quick Date Presets */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Quick Date Presets:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {datePresets.map((preset) => (
                        <DatePresetChip
                          key={preset.label}
                          label={preset.label}
                          onClick={() => handleDatePreset(preset.days)}
                          clickable
                          size="medium"
                        />
                      ))}
                    </Stack>
                  </Box>

                  {/* Date Pickers */}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 0,
                                background: alpha('#fff', 0.8),
                              },
                            },
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            size: 'small',
                            sx: {
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 0,
                                background: alpha('#fff', 0.8),
                              },
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </FilterSection>
              </Grid>

              {/* Vehicle & Brand Section */}
              <Grid item xs={12}>
                <FilterSection>
                  <SectionTitle>
                    <CarIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Vehicle & Brand Filters
                    </Typography>
                  </SectionTitle>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <StyledFormControl fullWidth size="small">
                        <InputLabel>Vehicle Type</InputLabel>
                        <Select
                          value={filters.vehicleType || "all"}
                          label="Vehicle Type"
                          onChange={(e) =>
                            handleFilterChange("vehicleType", e.target.value)
                          }
                        >
                          <MenuItem value="all">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FilterIcon fontSize="small" />
                              All Types
                            </Box>
                          </MenuItem>
                          <MenuItem value="car">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CarIcon fontSize="small" />
                              Cars Only
                            </Box>
                          </MenuItem>
                          <MenuItem value="bike">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <BikeIcon fontSize="small" />
                              Bikes Only
                            </Box>
                          </MenuItem>
                        </Select>
                      </StyledFormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <StyledTextField
                        fullWidth
                        size="small"
                        label="Brand"
                        placeholder="Enter brand name..."
                        value={filters.brand || ""}
                        onChange={(e) => handleFilterChange("brand", e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                              <FilterIcon fontSize="small" color="action" />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <StyledFormControl fullWidth size="small">
                        <InputLabel>Region</InputLabel>
                        <Select
                          value={filters.region || ""}
                          label="Region"
                          onChange={(e) => handleFilterChange("region", e.target.value)}
                        >
                          <MenuItem value="">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LocationIcon fontSize="small" />
                              All Regions
                            </Box>
                          </MenuItem>
                          <MenuItem value="North America">North America</MenuItem>
                          <MenuItem value="Europe">Europe</MenuItem>
                          <MenuItem value="Asia">Asia</MenuItem>
                          <MenuItem value="Australia">Australia</MenuItem>
                          <MenuItem value="Africa">Africa</MenuItem>
                        </Select>
                      </StyledFormControl>
                    </Grid>
                  </Grid>
                </FilterSection>
              </Grid>

              {/* Price Range Section */}
              <Grid item xs={12}>
                <FilterSection>
                  <SectionTitle>
                    <MoneyIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Price Range Filter
                    </Typography>
                  </SectionTitle>

                  <Box>
                    <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                      Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
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
                      sx={{ 
                        mt: 2,
                        '& .MuiSlider-thumb': {
                          borderRadius: 0,
                          width: 20,
                          height: 20,
                        },
                        '& .MuiSlider-rail': {
                          height: 6,
                        },
                        '& .MuiSlider-track': {
                          height: 6,
                        },
                      }}
                    />
                  </Box>
                </FilterSection>
              </Grid>
            </Grid>
          </AccordionContent>
        </Collapse>
      </FilterContainer>
    </LocalizationProvider>
  );
};

export default AdvancedFilters;
