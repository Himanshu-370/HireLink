import * as React from "react";
import { Box, Grid, Typography, Button, styled } from "@mui/material";
import Logo from "../../assets/snuLogoBlue.png";

const Header = (props) => {
  const StyledButton = styled(Button)({
    backgroundColor: "#3c8dbc",
    "&:hover": {
      backgroundColor: "#367fa9",
    },
  });

  return (
    <Box sx={{ py: 1.5, backgroundColor: "#fff", color: "white" }}>
      <Grid container justifyContent="center">
        <Grid item xs={11.5}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              component="img"
              sx={{
                height: "auto",
                width: 162,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="Shiv Nadar University"
              src={Logo}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.4,
                color: "#000",
              }}
            >
              <Typography variant="subtitle" sx={{ fontSize: "18px" }}>
                Jobs & Opportunities
              </Typography>
              <StyledButton
                onClick={props.openNewJobModal}
                variant="contained"
                disableElevation
              >
                Post a job
              </StyledButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
