"use client";
import styles from "./page.module.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function RegistrationForm() {
  function Button(props) {
    return (
      <div className="flex items-center justify-center gap-2 ">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
          type={props.type}
        >
          {props.title}
        </button>
      </div>
    );
  }

  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const [nameInput, setNameInput] = useState("");
  return (
    <div className="w-full flex items-center justify-center flex-col h-screen">
      <form className="bg-white mb-4 rounded-xl shadow-2xl hover:shadow-md p-10">
        <p className="m-3 text-center text-2xl">Create Account</p>
        <div className="mb-4">
          <TextField
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
            color="secondary"
            className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:outline-purple-300"
            id="Name"
            type="text"
            label="Name"
          />
        </div>
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
        <div className="mb-1" />
        <div className="flex items-center justify-center gap-2 ">
          <Button title="Link Account" type="button" />
          <Button title="Submit" type="submit" />
        </div>
        <p className=" m-2 text-center text-sm">
          Already have an Account?&nbsp;
          <Link
            href="/navbar"
            className="text-purple-500 underline cursor-pointer hover:text-purple-900"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
