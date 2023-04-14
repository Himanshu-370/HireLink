import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Chip,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format, differenceInMinutes } from "date-fns";

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

const SkillChip = styled(Chip)(({ theme }) => ({
  margin: "4px",
  padding: "6px",
  fontSize: "14.5px",
  borderRadius: "5px",
  transition: "0.3s",
  fontWeight: 600,
  backgroundColor: "#0B0B15",
  color: "#fff",
}));

const JobCard = (props) => {
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    await props.open();
    setLoading(false);
  };

  return (
    <Wrapper p={2} mt={2}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {props.title}
          </Typography>
          <CompanyName sx={{ fontWeight: 400, fontSize: "0.8rem" }}>
            {props.companyName}
          </CompanyName>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid key={skill} m={0.2} item>
              <SkillChip label={skill} />
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption">
              {format(props.postedOn, "dd/MM/yyyy HH:mm")} | {props.type} |{" "}
              {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button
                onClick={handleCheck}
                variant="outlined"
                sx={{
                  backgroundColor: "#3c8dbc",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#367fa9",
                  },
                }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress color="secondary" size={22} />
                ) : (
                  "Check"
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default JobCard;
