import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'mui-image';
import { Link } from 'react-router-dom';
import storeLogo from '../assets/logo.png';

const Header = () => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" mb={2}>
      <Box>
        <Link to="/">
          <Image src={storeLogo} alt="Online store"></Image>
        </Link>
      </Box>
      <Box>Cart Info</Box>
    </Grid>
  );
};

export default Header;
