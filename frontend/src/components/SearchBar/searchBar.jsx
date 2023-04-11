import React, { useState } from "react";
import { Box, Button, Select, MenuItem, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  wrapper: {
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
  },
});

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

  // console.log(jobSearch);
  const search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    setLoading(false);
  };

  const classes = useStyles();

  return (
    <Box p={2} mt={-5} className={classes.wrapper}>
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
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        disableElevation
        onClick={search}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};

export default SearchBar;
