import React from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
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

const SearchBar = () => {
  const classes = useStyles();

  return (
    <Box p={2} mt={-5} className={classes.wrapper}>
      <Select disableUnderline variant="filled" defaultValue="Full time">
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Part time">Part time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select disableUnderline variant="filled" defaultValue="Remote">
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="In-office">In-office</MenuItem>
      </Select>
      <Button variant="contained" color="primary" disableElevation>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
