import { Box, Badge } from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsContext } from '../context/AppContext';
import { Product } from '../types/ProductTypes';
import { storeItem } from '../types/CartTypes';
import { ShoppingCartIcon } from '../theme/Icons';
import { ProductDetailsLabels } from '../types/ProductTypes';

const CartInfo = () => {
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

  // TODO: те же замечания что тут src/components/AddToCartButton.tsx:15
  window.addEventListener('build', () => {
    setStore(JSON.parse(localStorage?.getItem(key) || '{}'));
  });

  window.addEventListener('StorageChanged', () => {
    setStore(JSON.parse(localStorage?.getItem(key) || '{}'));
  });

  // TODO: не используйте сокращения переменных (cur)
  // Используйте деструктуризацию объектов в параметрах {quantity, price} вместо cur
  const totalSum = productArr?.reduce<number>((acc: number, cur: Product) => {
    if (cur.quantity && cur.price) {
      return (acc += +cur?.quantity * +cur?.price); // лишняя проверка на undefined, в условии уже проверяется существование
    }
    return 0; // если у какого-то товара в корзине по каким-то причинам цена будет = 0 - общая сумма посчитается некорректно.
    // редюсер может быть упрощен до reduce.(acc: number, {quantity, price}: Product) => acc + quantity * price, 0)
  }, 0);
  const totalItems = productArr?.reduce<number>((acc: number, cur: Product) => {
    if (cur.quantity && cur.price) {
      return (acc += +cur?.quantity);
    }
    return 0;
  }, 0);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'right' },
        mt: { xs: 3, sm: 0 },
        alignItems: 'center',
        gap: 3,
      }}>
      <Box>
        Total: {ProductDetailsLabels.Currency} {totalSum.toFixed(2)}
      </Box>
      <Link to={'/cart'}>
        <Badge badgeContent={totalItems} color="primary">
          <ShoppingCartIcon color="action" fontSize="large" />
        </Badge>
      </Link>
    </Box>
  );
};

export default CartInfo;
