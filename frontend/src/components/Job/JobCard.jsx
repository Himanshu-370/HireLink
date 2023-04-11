import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { differenceInMinutes } from "date-fns";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    transition: "0.3s",

    "&:hover": {
      boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #4D64E4",
    },
  },
  companyName: {
    fontSize: "13.5px",
    borderRadius: "5px",
    fontWeight: 600,
    display: "inline-block",
    backgroundColor: "#18E1D9",
    margin: "4px",
    padding: "6px",
  },
  skillChip: {
    margin: "4px",
    padding: "6px",
    fontSize: "14.5px",
    borderRadius: "5px",
    transition: "0.3s",
    // cursor: "pointer",
    fontWeight: 600,
    backgroundColor: "#0B0B15",
    color: "#fff",
  },
}));

const JobCard = (props) => {
  const classes = useStyles();

  return (
    <Box p={2} mt={2} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography className={classes.companyName} variant="subtitle1">
            {props.companyName}
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid key={skill} m={0.5} className={classes.skillChip} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption">
              {differenceInMinutes(Date.now(), props.postedOn)} min ago |
              {props.type} | {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button variant="outlined">Check</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobCard;
