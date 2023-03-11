import React from 'react';
import Dialog from '@mui/material/Dialog';
import MuiDialogActions from '@mui/material/DialogActions';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import Loading from './loading';

const StyledButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
}))

const StyledMuiDialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
  margin: 0,
  marginRight: theme.spacing(4),
  padding: theme.spacing(2),
}))

const DialogTitle = (props) => {
  const { children, onClose, disabled, ...other } = props;
  return (
    <StyledMuiDialogTitle {...other}>
      {children}
      {onClose ? (
        <StyledButton aria-label="close" onClick={onClose} disabled={disabled}>
          <CloseIcon />
        </StyledButton>
      ) : null}
    </StyledMuiDialogTitle>
  );
};

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));

export default function Modal({
  open,
  handleClose,
  children,
  title,
  actions,
  loading,
  loadingError,
  reload,
  contentProps,
  disableClose,
  ...other
}) {
  return (
    <Dialog onClose={handleClose} aria-labelledby={title} open={open} {...other}>
      <DialogTitle id={`id-is${title}`} onClose={handleClose} disabled={disableClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers {...contentProps}>
        {loading || loadingError ? <Loading loading={loading} loadingError={loadingError} reload={reload} /> : children}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
