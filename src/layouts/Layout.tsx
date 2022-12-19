import { Outlet } from 'react-router';
import Header from '../layouts/Header';
import Footer from './Footer';

import '@fontsource/inter';
import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import muiThemeSettings from '../theme/Theme';

function Layout() {
  return (
    <ThemeProvider theme={muiThemeSettings}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap="8px"
        padding={1}
        direction="column">
        <Header />
        <Outlet />
        <Footer />
      </Grid>
    </ThemeProvider>
  );
}

export default Layout;
