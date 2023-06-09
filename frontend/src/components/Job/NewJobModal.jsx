import React, { useEffect, useState } from "react";
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
  CircularProgress,
  styled,
} from "@mui/material";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Close as CloseIcon } from "@mui/icons-material";

const useStyles = makeStyles({
  skillChip: {
    margin: "4px",
    padding: "6px",
    fontSize: "14.5px",
    borderRadius: "5px",
    transition: "0.3s",
    cursor: "pointer",
    fontWeight: 600,
    border: "2px solid #0B0B15",
    color: "#0B0B15",

    "&:hover": {
      backgroundColor: "#0B0B15",
      color: "#fff",
    },
  },
  included: {
    backgroundColor: "#0B0B15",
    color: "#fff",
  },
});

const initState = {
  title: "",
  type: "Full time",
  companyName: "",
  companyUrl: "",
  location: "Remote",
  locationDetails: "",
  eligibility: "",
  link: "",
  description: "",
};

const NewJobModal = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const [jobDetails, setJobDetails] = useState(initState);

  const handleChange = (e) => {
    e.preventDefault();
    setJobDetails((oldState) => {
      return { ...oldState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    console.log(jobDetails)
  }, [jobDetails])

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (jobDetails[field] === "string" && !jobDetails[field]) return;
    }
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  };

  const closeModal = () => {
    setJobDetails(initState);
    setLoading(false);
    props.closeModal();
  };

  const StyledButton = styled(Button)({
    backgroundColor: "#3c8dbc",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#367fa9",
    },
  });

  return (
    <Dialog open={props.newJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetails.title}
              autoComplete="off"
              placeholder="Job Title *"
              disableUnderline
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              fullWidth
              name="type"
              value={jobDetails.type}
              disableUnderline
              variant="filled"
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Internship">Internship</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyName"
              value={jobDetails.companyName}
              autoComplete="off"
              placeholder="Company Name *"
              disableUnderline
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyUrl"
              value={jobDetails.companyUrl}
              autoComplete="off"
              placeholder="Company Url *"
              disableUnderline
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="location"
              value={jobDetails.location}
              disableUnderline
              variant="filled"
              fullWidth
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-office">In-office</MenuItem>
            </Select>
          </Grid>

          {/* {jobDetails.location == "In-office" && (
            <Grid item xs={6}>
              <FilledInput
                label="Location"
                name="locationDetails"
                value={jobDetails.locationDetails}
                variant="filled"
                placeholder="Enter the location"
                fullWidth
                disableUnderline
                required
              />
            </Grid>
          )} */}
          <Grid item xs={6}>
            <FilledInput
              label="Location"
              name="locationDetails"
              value={jobDetails.locationDetails}
              onChange={handleChange}
              variant="filled"
              placeholder="Enter the location"
              fullWidth
              disableUnderline
              required
              disabled={jobDetails.location !== "In-office"} // disable the input field if location is not "In-office"
            />
          </Grid>

          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="eligibility"
              value={jobDetails.eligibility}
              autoComplete="off"
              placeholder="Eligibility *"
              disableUnderline
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="link"
              value={jobDetails.link}
              autoComplete="off"
              placeholder="Job link *"
              disableUnderline
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              name="description"
              value={jobDetails.description}
              autoComplete="off"
              placeholder="Job Description *"
              disableUnderline
              fullWidth
              multiline
              required
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          m={1}
        >
          <Typography variant="caption">*Required Fields</Typography>
          <StyledButton
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Job"
            )}
          </StyledButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewJobModal;
