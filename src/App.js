import React, { useEffect } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { AlertTemplet } from './components/commons';
import { messageStore } from "./store"
// ----------------------------------------------------------------------

export default function App() {
  useEffect(() => {
  }, []);
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
      <AlertTemplet messageStore={messageStore} />
    </ThemeProvider>
  );
}
