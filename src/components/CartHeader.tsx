import { Box, Button } from '@mui/material';

interface CartHeader {
  itemsNum: number;
  page: number;
  onBackHandler: () => void;
  onForwardHandler: () => void;
}

const CartHeader = (props: CartHeader) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>Products in Cart</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ marginRight: '1rem' }}>
          ITEMS: <Box component="span">{props.itemsNum}</Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>Page:</Box>
          <Button onClick={props.onBackHandler}>{`<`}</Button>
          <Box>{props.page}</Box>
          <Button onClick={props.onForwardHandler}>{`>`}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartHeader;
