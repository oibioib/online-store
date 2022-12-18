import { createTheme } from '@mui/material/styles';

const muiThemeSettings = createTheme({
  // palette: {
  //   primary: {
  //     main: '#ff6a0b',
  //   },
  // },
  typography: {
    allVariants: {
      fontFamily: '"Inter", "Roboto", sans-serif',
    },
  },
});

export default muiThemeSettings;
