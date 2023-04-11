import * as React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

const Header = (props) => {
  return (
    <Box sx={{ py: 10, backgroundColor: "#0B0B15", color: "white" }}>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" component="h1">
              Listing App
            </Typography>
            <Button
              onClick={props.openNewJobModal}
              variant="contained"
              color="primary"
              disableElevation
            >
              Post a job
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
