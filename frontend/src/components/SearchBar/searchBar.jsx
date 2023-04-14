import React, { useState } from "react";
import styled from "@mui/material/styles/styled";
import { Box, Button, Select, MenuItem, CircularProgress } from "@mui/material";

const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
  alignItems: "center",
  borderRadius: "5px",
  "& > *": {
    flex: 1,
    margin: "8px",
    height: "45px",
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#3c8dbc",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#367fa9",
  },
}));

const SearchBar = (props) => {
  const [loading, setLoading] = useState(false);
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    location: "Remote",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setJobSearch((oldState) => {
      return { ...oldState, [e.target.name]: e.target.value };
    });
  };

  const search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  return (
    <Wrapper p={2}>
      <Select
        onChange={handleChange}
        value={jobSearch.type}
        name="type"
        disableUnderline
        variant="filled"
        defaultValue="Full time"
      >
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Part time">Part time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select
        onChange={handleChange}
        value={jobSearch.location}
        name="location"
        disableUnderline
        variant="filled"
        defaultValue="Remote"
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-office">In-office</MenuItem>
      </Select>
      <SearchButton
        disabled={loading}
        variant="contained"
        disableElevation
        onClick={search}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </SearchButton>
    </Wrapper>
  );
};

export default SearchBar;
