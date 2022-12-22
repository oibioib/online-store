import Image from 'mui-image';
import { Grid, Box, Button } from '@mui/material';
import { ProductDetailsLabels, ICartProducts } from '../types/Types';

const CartProducts = (props: ICartProducts) => {
  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
      <Grid item xs={1}>
        {props.index + 1}
      </Grid>
      <Grid item xs={2}>
        {' '}
        <Image src={`${props.images[0]}`} alt={`${props.title}`} />
      </Grid>
      <Grid item xs={7}>
        {props.title}
        <Box>{props.description}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            {ProductDetailsLabels.Rating}: {props.rating}
          </Box>
          <Box>
            {ProductDetailsLabels.DiscountPercentage}: {props.discountPercentage} %
          </Box>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box>
          {ProductDetailsLabels.Stock}:{props.stock}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button>+</Button>
          <Box>{props.quantity}</Box>
          <Button>-</Button>
        </Box>
        <Box>
          {ProductDetailsLabels.Currency}
          {props.quantity && props.quantity * props.price}.00
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartProducts;
