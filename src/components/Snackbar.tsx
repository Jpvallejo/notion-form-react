import { Alert, AlertColor, Snackbar as MUISnackbar } from "@mui/material"

export type SnackbarPropsType = {
    open: boolean;
    handleClose: () => void;
    severity: AlertColor;
    text: string;
}

export const Snackbar = (props: SnackbarPropsType) => {
    const {open, handleClose, severity, text} = props;
    return (
        <MUISnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </MUISnackbar>
      );
      
}