import React from 'react';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const StyledBox = styled(Box)(({theme}) => {
  return {
    minHeight: theme.spacing(20),
    width: '100%',
    height: '100%',
  }
})

function Loading({ loading, loadingError, reload, children }) {

  return loading || loadingError ? (
    <StyledBox
      display="flex"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {loading && <CircularProgress color="secondary" />}
      {loadingError && (
        <>
          <Box my={2}>
            <Typography color="error">{loadingError}</Typography>
          </Box>
          {reload && (
            <Box my={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  reload();
                }}
              >
                Reload
              </Button>
            </Box>
          )}
        </>
      )}
    </StyledBox>
  ) : (
    <>{children}</>
  );
}

export default Loading;

export function LoadingButton({ loading, children, progressProps, ...buttonProps }) {
  return (
    <Button {...buttonProps}>
      {' '}
      {loading && (
        <CircularProgress size={20} style={{ marginRight: '0.5rem', opacity: loading ? 1 : 0 }} {...progressProps} />
      )}{' '}
      {children}
    </Button>
  );
}
