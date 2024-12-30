"use client";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Chip } from "@mui/material";
import { useFilter } from "@/store/contexts/FilterContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(to right, #9333ea, #ec4899)",
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "#f3e8ff",
    transition: "all 0.2s",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getStatusChipProps = (status) => {
  switch (status.toLowerCase()) {
    case "valid":
      return { color: "success", label: "Valid", variant: "outlined" };
    case "expired":
      return { color: "error", label: "Expired", variant: "outlined" };
    case "used":
      return { color: "warning", label: "Used", variant: "outlined" };
    default:
      return { color: "default", label: status, variant: "outlined" };
  }
};

export default function CustomTable() {
  const rows = useFilter().filter.myCards || [];

  return (
    <TableContainer
      component={Paper}
      className="w-11/12 max-w-6xl mx-auto mt-6 rounded-xl shadow-lg overflow-hidden"
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Gift Card Code</StyledTableCell>
            <StyledTableCell>Buyer Name</StyledTableCell>
            <StyledTableCell>Gift Card User</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="left">Amount (ETH)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const statusProps = getStatusChipProps(row.status);
            return (
              <StyledTableRow key={row.giftCardCode}>
                <StyledTableCell component="th" scope="row">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {row.giftCardCode}
                  </span>
                </StyledTableCell>
                <StyledTableCell>{row.buyerName}</StyledTableCell>
                <StyledTableCell>{row.giftCardUser}</StyledTableCell>
                <StyledTableCell>
                  <Chip {...statusProps} />
                </StyledTableCell>
                <StyledTableCell>
                  <span className="font-medium">
                    {row.amount.toFixed(2)} ETH
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
