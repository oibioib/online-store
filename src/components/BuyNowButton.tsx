import { Button } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { isModalContext } from '../context/AppContext';

const BuyNowButton = () => {
  //TODO Check if the id in cart or not, and add it to cart

  const { setIsModal } = useContext(isModalContext);

  const handleOpen = () => {
    setIsModal(true);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen} component={Link} to={'/cart'}>
        Buy now
      </Button>
    </>
  );
};

export default BuyNowButton;
