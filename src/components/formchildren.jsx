"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";

export default function FormChildren(props) {
  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const [nameInput, setNameInput] = useState("");

  const childrenTypes = [
    { type: "textField", label: props.label },
    { type: "select" },
  ];

  if (props.type === "textField") {
    return (
      <TextField
        value={nameInput}
        onChange={(e) => {
          setNameInput(e.target.value);
        }}
        color="secondary"
        className={`shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:outline-purple-300 ${props.className}`}
        id={childrenTypes[0].label}
        type="text"
        label={childrenTypes[0].label}
      />
    );
  }

  if (props.type === "select") {
    return (
      <Box sx={{ minWidth: 120, marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }
}
