import { createTheme } from '@mui/material/styles';

const muiThemeSettings = createTheme({
  palette: {
    primary: {
      main: '#3a86ff',
    },
  },
  typography: {
    allVariants: {
      fontFamily: '"Inter", "Roboto", sans-serif',
    },
  },
  shape: {
    borderRadius: 6,
  },
});

export default muiThemeSettings;
