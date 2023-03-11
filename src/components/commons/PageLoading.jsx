import { Box } from '@mui/material';
import React, { ReactElement } from 'react';
import logo from '../../assets/images/logo.png';

export default function PageLoading({ className }) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
      className={className || ''}
    >
      <div>
        <img
          src={logo}
          alt="Loading"
          style={{ width: '6rem' }}
          // className="zoom-in-out"
        />
        <Box mt={2} textAlign="center">
          <div className="dot-container">
            <span className="dot-colored primary" />
            <span className="dot-colored red" />
            <span className="dot-colored black" />
          </div>
        </Box>
      </div>
    </Box>
  );
}
