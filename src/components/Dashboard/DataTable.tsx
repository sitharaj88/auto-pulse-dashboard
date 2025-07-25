import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  Box,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import type { SaleRecord } from "../../types";

interface DataTableProps {
  salesData: SaleRecord[];
}

const DataTable: React.FC<DataTableProps> = ({ salesData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "N/A";

    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case "cash":
        return "success";
      case "finance":
        return "primary";
      case "lease":
        return "secondary";
      default:
        return "default";
    }
  };

  const paginatedData = salesData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card sx={{ width: "100%", overflow: "hidden" }}>
      <CardContent sx={{ p: { xs: 1, sm: 2, md: 3 }, pb: { xs: 1, sm: 2, md: 3 } }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ 
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            mb: { xs: 1, sm: 2, md: 3 }
          }}
        >
          Recent Sales Transactions
        </Typography>
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <TableContainer
            sx={{
              maxHeight: { xs: 400, sm: 500, md: 600 },
              minWidth: { xs: 320, sm: 600, md: 800 },
              '& .MuiTable-root': {
                minWidth: { xs: 600, sm: 800, md: 1000 },
              },
            }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 80 }}>Date</TableCell>
                  <TableCell sx={{ minWidth: 150 }}>Vehicle</TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", md: "table-cell" },
                      minWidth: 120,
                    }}
                  >
                    Customer
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                      minWidth: 100,
                    }}
                  >
                    Sales Person
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", lg: "table-cell" },
                      minWidth: 80,
                    }}
                  >
                    Region
                  </TableCell>
                  <TableCell align="right" sx={{ minWidth: 100 }}>Sale Price</TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                      minWidth: 80,
                    }}
                  >
                    Payment
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: { xs: "none", md: "table-cell" },
                      minWidth: 80,
                    }}
                  >
                    Profit
                  </TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
              {paginatedData.map((sale) => (
                <TableRow key={sale.id} hover>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {formatDate(sale.saleDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        sx={{
                          width: { xs: 24, sm: 32 },
                          height: { xs: 24, sm: 32 },
                          bgcolor:
                            sale.vehicle.type === "car" ? "#1976d2" : "#dc004e",
                        }}
                      >
                        {sale.vehicle.type === "car" ? (
                          <DirectionsCarIcon
                            sx={{ fontSize: { xs: 12, sm: 16 } }}
                          />
                        ) : (
                          <TwoWheelerIcon
                            sx={{ fontSize: { xs: 12, sm: 16 } }}
                          />
                        )}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight="medium"
                          sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                        >
                          {sale.vehicle.model}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: { xs: "none", sm: "block" },
                            fontSize: { xs: "0.65rem", sm: "0.75rem" },
                          }}
                        >
                          {sale.vehicle.year} • {sale.vehicle.color}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    <Typography variant="body2">{sale.customerName}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {sale.customerEmail}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {sale.salesPersonName}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", lg: "table-cell" },
                    }}
                  >
                    <Typography variant="body2">{sale.region}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {formatCurrency(sale.salePrice)}
                    </Typography>
                    {sale.discount > 0 && (
                      <Typography
                        variant="caption"
                        color="success.main"
                        sx={{
                          display: { xs: "none", sm: "block" },
                          fontSize: { xs: "0.65rem", sm: "0.75rem" },
                        }}
                      >
                        -{sale.discount.toFixed(1)}% discount
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    <Chip
                      label={
                        sale.paymentMethod.charAt(0).toUpperCase() +
                        sale.paymentMethod.slice(1)
                      }
                      color={
                        getPaymentMethodColor(sale.paymentMethod) as
                          | "success"
                          | "primary"
                          | "secondary"
                          | "default"
                      }
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="success.main"
                    >
                      {formatCurrency(sale.profit)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>
        <TablePagination
          component="div"
          count={salesData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          sx={{
            "& .MuiTablePagination-toolbar": {
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 0 },
              minHeight: { xs: 80, sm: 52 },
              px: { xs: 1, sm: 2 },
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                margin: 0,
              },
            "& .MuiTablePagination-actions": {
              marginLeft: { xs: 0, sm: "auto" },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default DataTable;
