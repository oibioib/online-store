import { Box } from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsContext } from '../context/AppContext';
import { Product } from '../types/ProductTypes';
import { storeItem } from '../types/CartTypes';
import { ShoppingCartIcon } from '../theme/Icons';
import { ProductDetailsLabels } from '../types/ProductTypes';
import { color } from '@mui/system';

const CartLogo = () => {
  const productsAll = useContext(productsContext);
  const key = 'OA_cart';
  const [store, setStore] = useState<string>(() => {
    return JSON.parse(localStorage?.getItem(key) || '{}');
  });
  const productArr: Product[] = [];

  const storeTempArr: storeItem[] = [];
  for (const [productId, value] of Object.entries<string>(store)) {
    storeTempArr.push({ id: +productId, quantity: +value });
  }
  const results = storeTempArr.map((item) => productsAll.find((product) => product.id === item.id));
  results.forEach((item) => {
    if (item) {
      productArr.push({ ...item, quantity: +store[item.id] });
    }
  });
  window.addEventListener('build', () => {
    setStore(JSON.parse(localStorage?.getItem(key) || '{}'));
  });
  window.addEventListener('StorageChanged', () => {
    setStore(JSON.parse(localStorage?.getItem(key) || '{}'));
  });

  const totalSum = productArr?.reduce<number>((acc: number, cur: Product) => {
    if (cur.quantity && cur.price) {
      return (acc += +cur?.quantity * +cur?.price);
    }
    return 0;
  }, 0);
  const totalItems = productArr?.reduce<number>((acc: number, cur: Product) => {
    if (cur.quantity && cur.price) {
      return (acc += +cur?.quantity);
    }
    return 0;
  }, 0);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: '20rem' }}>
      <Box>
        Total Sum: {ProductDetailsLabels.Currency} {totalSum.toFixed(2)}
      </Box>
      <Box component={Link} to={'/cart'} sx={{ position: 'relative' }}>
        <ShoppingCartIcon fontSize="large" />
        <Box sx={{ position: 'absolute', top: '10%', left: '30%', color: 'white' }}>{totalItems}</Box>
      </Box>
    </Box>
  );
};

export default CartLogo;
