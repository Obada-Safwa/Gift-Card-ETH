"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";

export default function FormChildren({
  value,
  onChange,
  type,
  label,
  className,
  inputType,
  menuItems,
}) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  if (type === "textField") {
    return (
      <TextField
        value={value || ""}
        onChange={onChange}
        color="secondary"
        className={`shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:outline-purple-300 ${className}`}
        type={inputType || "text"}
        name={label}
        label={capitalizeFirstLetter(label)}
      />
    );
  }

  if (type === "select") {
    const menuItemsElement = menuItems.map((item) => (
      <MenuItem key={item.value} value={item.value}>
        {item.label}
      </MenuItem>
    ));

    return (
      <Box sx={{ minWidth: 120, marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label" color="secondary">
            {capitalizeFirstLetter(label)}
          </InputLabel>
          <Select
            color="secondary"
            labelId="select-label"
            id={label}
            name={label}
            value={value || ""}
            label={label}
            onChange={onChange}
          >
            {menuItemsElement}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return null;
}
