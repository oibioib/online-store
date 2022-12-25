import { createTheme } from '@mui/material/styles';

const muiThemeSettings = createTheme({
  palette: {
    primary: {
      main: '#21618C',
    },
    secondary: {
      main: '#FFA07A',
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      letterSpacing: 'normal',
    },
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default muiThemeSettings;
