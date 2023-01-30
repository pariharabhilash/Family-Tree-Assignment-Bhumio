import React from "react";
import { Stack, Snackbar, Alert as MuiAlert, Slide } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const TransitionLeft = (props) => {
  return <Slide {...props} direction="left" />;
};
const SnackbarAlert = ({ message, type = "success", show, handleClose }) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={show}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarAlert;
