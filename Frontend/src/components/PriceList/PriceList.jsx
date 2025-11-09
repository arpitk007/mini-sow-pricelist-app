import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputBase,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add, Print, Tune, Search, MoreVert } from "@mui/icons-material";

const PriceList = () => {
  const [rows, setRows] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      id: i + 1,
      article: `1234567${i}`,
      product: `Sample Product ${i + 1}`,
      inPrice: (Math.random() * 1000 + 500).toFixed(2),
      price: (Math.random() * 1500 + 800).toFixed(2),
      unit: "kilometers/hour",
      stock: Math.floor(Math.random() * 10000),
      description: "This is a test description",
    }))
  );

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEdit = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
  <Box
    sx={{
      p: { xs: 2, sm: 3 },
      backgroundColor: "#fff",
      borderRadius: 2,
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* --- Search + Actions Bar --- */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      {/* Search Fields */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search Article No ..."
          InputProps={{
            endAdornment: <Search fontSize="small" color="action" />,
          }}
        />
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search Product ..."
          InputProps={{
            endAdornment: <Search fontSize="small" color="action" />,
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: "#00c853",
            "&:hover": { backgroundColor: "#00b14a" },
            borderRadius: "25px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          New Product
        </Button>
        <Button
          variant="contained"
          startIcon={<Print />}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#1565c0" },
            borderRadius: "25px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Print List
        </Button>
        <Button
          variant="outlined"
          startIcon={<Tune />}
          sx={{
            borderRadius: "25px",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Advanced Mode
        </Button>
      </Box>
    </Box>

    {/* --- Scrollable Table Wrapper with Shadow Fade --- */}
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Shadow */}
      <Box
        className="fade-top"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 30,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0))",
          opacity: 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {/* Scrollable Table */}
      <Box
        sx={{
          maxHeight: "65vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: "4px",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
        onScroll={(e) => {
          const topShadow = e.currentTarget.parentNode.querySelector(".fade-top");
          const bottomShadow = e.currentTarget.parentNode.querySelector(".fade-bottom");

          const scrollTop = e.currentTarget.scrollTop;
          const scrollHeight = e.currentTarget.scrollHeight;
          const clientHeight = e.currentTarget.clientHeight;

          topShadow.style.opacity = scrollTop > 0 ? 1 : 0;
          bottomShadow.style.opacity =
            scrollTop + clientHeight < scrollHeight - 5 ? 1 : 0;
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            borderRadius: "16px",
            border: "1px solid #e0e0e0",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {!isMobile && <TableCell>Article No.</TableCell>}
                <TableCell>Product/Service</TableCell>
                {!isMobile && !isTablet && <TableCell>In Price</TableCell>}
                <TableCell>Price</TableCell>
                {!isMobile && <TableCell>Unit</TableCell>}
                {!isTablet && <TableCell>In Stock</TableCell>}
                {!isTablet && <TableCell>Description</TableCell>}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {!isMobile && (
                    <TableCell>
                      <InputBase
                        value={row.article}
                        onChange={(e) =>
                          handleEdit(row.id, "article", e.target.value)
                        }
                        sx={{
                          border: "1px solid #ccc",
                          px: 1,
                          borderRadius: "25px",
                          fontSize: "0.9rem",
                        }}
                      />
                    </TableCell>
                  )}
                  <TableCell>
                    <InputBase
                      value={row.product}
                      onChange={(e) =>
                        handleEdit(row.id, "product", e.target.value)
                      }
                      sx={{
                        border: "1px solid #ccc",
                        px: 1,
                        borderRadius: "25px",
                        fontSize: "0.9rem",
                        width: "100%",
                      }}
                    />
                  </TableCell>

                  {!isMobile && !isTablet && (
                    <TableCell>
                      <InputBase
                        value={row.inPrice}
                        onChange={(e) =>
                          handleEdit(row.id, "inPrice", e.target.value)
                        }
                        sx={{
                          border: "1px solid #ccc",
                          px: 1,
                          borderRadius: "25px",
                          fontSize: "0.9rem",
                        }}
                      />
                    </TableCell>
                  )}

                  <TableCell>
                    <InputBase
                      value={row.price}
                      onChange={(e) =>
                        handleEdit(row.id, "price", e.target.value)
                      }
                      sx={{
                        border: "1px solid #ccc",
                        px: 1,
                        borderRadius: "25px",
                        fontSize: "0.9rem",
                      }}
                    />
                  </TableCell>

                  {!isMobile && (
                    <TableCell>
                      <InputBase
                        value={row.unit}
                        onChange={(e) =>
                          handleEdit(row.id, "unit", e.target.value)
                        }
                        sx={{
                          border: "1px solid #ccc",
                          px: 1,
                          borderRadius: "25px",
                          fontSize: "0.9rem",
                        }}
                      />
                    </TableCell>
                  )}

                  {!isTablet && (
                    <TableCell>
                      <InputBase
                        value={row.stock}
                        onChange={(e) =>
                          handleEdit(row.id, "stock", e.target.value)
                        }
                        sx={{
                          border: "1px solid #ccc",
                          px: 1,
                          borderRadius: "25px",
                          fontSize: "0.9rem",
                        }}
                      />
                    </TableCell>
                  )}

                  {!isTablet && (
                    <TableCell>
                      <InputBase
                        value={row.description}
                        onChange={(e) =>
                          handleEdit(row.id, "description", e.target.value)
                        }
                        sx={{
                          border: "1px solid #ccc",
                          px: 1,
                          borderRadius: "25px",
                          fontSize: "0.9rem",
                        }}
                      />
                    </TableCell>
                  )}

                  <TableCell align="right">
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Bottom Shadow */}
      <Box
        className="fade-bottom"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.08), rgba(0,0,0,0))",
          opacity: 1,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />
    </Box>
  </Box>
);
};