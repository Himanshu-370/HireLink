import React from "react";
import {
  Box,
  Grid,
  FilledInput,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Close as CloseIcon } from "@mui/icons-material";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      margin: "4px",
    },
  },
  skillChip: {
    // margin: "4px",
    padding: "6px",
    // fontSize: "14.5px",
    borderRadius: "5px",
    transition: "0.3s",
    // cursor: "pointer",
    // fontWeight: 600,
    backgroundColor: "#333",
    color: "#fff",
  },
}));

const ViewJobModal = (props) => {
  const classes = useStyles();
  // const keys = Object.keys(props.job);
  // console.log(keys);

  const StyledButton = styled(Button)({
    backgroundColor: "#3c8dbc",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#367fa9",
    },
  });

  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {props.job.title} @ {props.job.companyName}
          <IconButton onClick={props.closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box className={classes.info} display="flex" alignItems="center">
            <Typography variant="subtitle1">Posted On: </Typography>
            <Typography variant="body1">
              {props.job.postedOn &&
                format(props.job.postedOn, "dd/MM/yyyy HH:MM")}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex" alignItems="center">
            <Typography variant="subtitle1">Job Type: </Typography>
            <Typography variant="body1">{props.job.type}</Typography>
          </Box>
          <Box className={classes.info} display="flex" alignItems="center">
            <Typography variant="subtitle1">Job location: </Typography>
            <Typography variant="body1">{props.job.location}</Typography>
          </Box>
          <Box className={classes.info} display="flex" alignItems="center">
            <Typography variant="subtitle1">Job Description: </Typography>
            <Typography variant="body1">{props.job.description}</Typography>
          </Box>
          <Box className={classes.info} display="flex" alignItems="center">
            <Typography variant="subtitle1">Company Name: </Typography>
            <Typography variant="body1">{props.job.companyName}</Typography>
          </Box>
          <Box className={classes.info} display="flex" alignItems="center">
            <Typography variant="subtitle1">Company Url: </Typography>
            <Typography
              variant="body1"
              component="a"
              href={props.job.companyUrl}
              target="_blank"
            >
              {props.job.companyUrl}
            </Typography>
          </Box>
          <Box ml={0.5}>
            <Typography variant="subtitle1">Skills: </Typography>
            <Grid container alignItems="center" display="flex" flexWrap="wrap">
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid item key={skill} className={classes.skillChip} m={0.5}>
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <StyledButton
          variant="outlined"
          component="a"
          href={props.job.link}
          target="_blank"
        >
          Apply
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewJobModal;
