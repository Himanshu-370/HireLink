import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Chip,
  Autocomplete,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import { Delete as DeleteIcon } from "@mui/icons-material";

const Wrapper = styled(Box)(({ theme }) => ({
  border: "1px solid #e8e8e8",
  cursor: "pointer",
  transition: "0.3s",
  background: "#fff",
  borderRadius: "5px",
  "&:hover": {
    boxShadow: "0 5px 25px rgba(0,0,0,0.1)",
    borderLeft: "6px solid #3c8dbc",
  },
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  display: "inline-block",
  margin: "4px",
}));

const JobCard = (props) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    await props.open();
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "location" && value === "In-office") {
      setShowLocationInput(true);
    } else {
      setShowLocationInput(false);
    }
    setJobDetails((prev) => ({ ...prev, [name]: value }));
    if (name === "location" && value !== "Remote") {
      setLocation(value);
      setLocationDetails("");
    } else {
      setLocation("");
      setLocationDetails("");
    }

    console.log(value);
  };

  const handleDelete = () => {
    props.deleteJob(props.id);
  };

  return (
    <Wrapper p={2} mt={2} mb={2}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {props.title}
          </Typography>
          <CompanyName sx={{ fontWeight: 400, fontSize: "0.8rem" }}>
            {props.companyName}
          </CompanyName>
        </Grid>
        {props.eligibility && (
          <Grid item container xs>
            <Typography variant="subtitle2">
              Eligibility: {props.eligibility}
            </Typography>
          </Grid>
        )}
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption" onChange={handleChange}>
              {format(props.postedOn, "dd/MM/yyyy")} | {props.type}
            </Typography>
            {props.locationDetails ? (
              <Typography variant="caption">
                | {props.locationDetails}
              </Typography>
            ) : (
              <Typography variant="caption">| {props.location}</Typography>
            )}
          </Grid>

          <Grid item>
            <Box mt={2}>
              <Button
                onClick={handleCheck}
                variant="outlined"
                sx={{
                  backgroundColor: "#3c8dbc",
                  color: "#fff",
                  marginRight: "10px",
                  "&:hover": {
                    backgroundColor: "#367fa9",
                  },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress color="secondary" size={22} />
                ) : (
                  "Read More"
                )}
              </Button>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default JobCard;
