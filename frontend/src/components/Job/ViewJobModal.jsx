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
} from "@mui/material";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Close as CloseIcon } from "@mui/icons-material";

const ViewJobModal = (props) => {
  return (
    <Dialog fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default ViewJobModal;
