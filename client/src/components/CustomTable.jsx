"use client";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Chip,
  Table,
  Paper,
  TableRow,
  styled,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import { useFilterCards } from "@/store/contexts/FilterCardsContext";
import { ethers } from "ethers";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const getStatusChipProps = (status) => {
  switch (status) {
    case 1n:
      return { color: "success", label: "Valid", variant: "outlined" };
    case 0n:
      return { color: "error", label: "Expired", variant: "outlined" };
    default:
      return { color: "default", label: status, variant: "outlined" };
  }
};

export default function CustomTable() {
  const rows = useFilterCards().currentCards || [];

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
            console.log(row);

            const statusProps = getStatusChipProps(row.giftCardStatus);
            return (
              <StyledTableRow key={row.code}>
                <StyledTableCell component="th" scope="row">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {row.code}
                  </span>
                </StyledTableCell>
                <StyledTableCell>{row["buyer"]}</StyledTableCell>
                <StyledTableCell>{row["giftCardUser"]}</StyledTableCell>
                <StyledTableCell>
                  <Chip {...statusProps} />
                </StyledTableCell>
                <StyledTableCell>
                  <span className="font-medium">
                    {ethers.formatUnits(row.amount.toString(), "ether")} ETH
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
