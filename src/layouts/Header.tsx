import { Grid } from '@mui/material';
import { Box } from '@mui/system';

const Header = () => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <Box>Logo</Box>
      <Box>Cart Info</Box>
    </Grid>
  );
};

export default Header;
