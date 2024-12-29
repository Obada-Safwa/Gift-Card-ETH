"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";

export default function FormChildren(props) {
  const handleTextFieldChange = (e) => {
    const value = e.target.value;
    if (props.stateName === "giftCardCode" && props.onGiftCardChange) {
      props.onGiftCardChange(value);
    } else if (props.stateName === "amount" && props.onAmountChange) {
      props.onAmountChange(value);
    } else if (props.onNameChange) {
      props.onNameChange(value);
    }
  };

  const handleSelectChange = (e) => {
    if (props.onGenderChange) {
      props.onGenderChange(e.target.value);
    }
  };

  if (props.type === "textField") {
    return (
      <TextField
        value={props.value || ""}
        onChange={handleTextFieldChange}
        color="secondary"
        className={`shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:outline-purple-300 ${props.className}`}
        id={props.label}
        type="text"
        label={props.label}
      />
    );
  }

  if (props.type === "select") {
    return (
      <Box sx={{ minWidth: 120, marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="select-label" color="secondary">
            Gender
          </InputLabel>
          <Select
            color="secondary"
            labelId="select-label"
            id="select"
            value={props.value || ""}
            label="Gender"
            onChange={handleSelectChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

  return null;
}
