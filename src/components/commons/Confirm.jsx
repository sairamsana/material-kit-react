import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Confirm({
  open,
  title,
  message,
  cancelText,
  onConfirm,
  confirmText,
  handleClose,
  children,
  disable,
  disableBackdropClose,
  isNegativeJob,
  autoFocus,
}) {
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open || false}
        onClose={(event, reason) => {
          console.log("reason getting for closing", reason)
          if (!disable && (disableBackdropClose ? !reason : true)) handleClose();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {message && <DialogContentText>{message}</DialogContentText>}
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus={
              autoFocus === false ? false : isNegativeJob
            }
            onClick={() => {
              handleClose();
            }}
            disabled={disable}
          >
            {cancelText || "Cancel"}
          </Button>
          <Button
            onClick={() => {
              if (onConfirm) onConfirm();
            }}
            color="primary"
            autoFocus={
              autoFocus === false ? false : !isNegativeJob
            }
            disabled={disable}
          >
            {confirmText || "Ok"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
