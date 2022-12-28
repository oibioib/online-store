import Image from 'mui-image';
import { Grid, Box, Button } from '@mui/material';
import { useState } from 'react';
import { ICartProducts, ProductDetailsLabels } from '../types/ProductTypes';

const CartProducts = (props: ICartProducts) => {
  //////// Working with local storage
  const key = 'OA_cart';
  const store = JSON.parse(localStorage?.getItem(key) || '{}');

  ////////////////
  const [quantity, setQuantity] = useState(props.quantity);
  let curQuantity = quantity;
  const onClickRiseHandler = () => {
    if (curQuantity && curQuantity < props.stock) {
      curQuantity++;
    }
    setQuantity(curQuantity);
    if (props.id) {
      localStorage.setItem(key, JSON.stringify({ ...store, [props.id]: curQuantity }));
      window.dispatchEvent(new Event('build'));
    }
  };

  const onClickDecreaseHandler = () => {
    if (curQuantity && curQuantity >= 0) {
      curQuantity--;
    }
    setQuantity(curQuantity);
    if (curQuantity === 0) {
      const tempObj = store;
      delete tempObj[`${props.id}`];
      localStorage.setItem(key, JSON.stringify({ ...tempObj }));
      window.dispatchEvent(new Event('build'));
    } else if (props.id) {
      localStorage.setItem(key, JSON.stringify({ ...store, [props.id]: curQuantity }));
      window.dispatchEvent(new Event('build'));
    }
  };
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
          <Button onClick={onClickRiseHandler}>+</Button>
          <Box>{quantity}</Box>
          <Button onClick={onClickDecreaseHandler}>-</Button>
        </Box>
        <Box>
          {ProductDetailsLabels.Currency}
          {quantity && quantity * props.price}.00
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartProducts;
