import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" gap="8px" padding={1}>
      <Button component={Link} to={'/'} variant="contained">
        Main page
      </Button>
      <Button component={Link} to={'/cart'} variant="contained">
        Cart
      </Button>
      <Button component={Link} to={'/product/26'} variant="contained">
        Product with ID 26
      </Button>
      <Button component={Link} to={'/product/101'} variant="contained">
        Product with ID 101 (No such product)
      </Button>
      <Button component={Link} to={'/qwerty'} variant="contained">
        Page 404
      </Button>
      <Button component={Link} to={'/?string=987&number=789'} variant="contained">
        Main page with query params
      </Button>
      <Button component={Link} to={'/ui'} variant="contained">
        Temp page with UI Elements
      </Button>
    </Grid>
  );
};

export default Footer;
