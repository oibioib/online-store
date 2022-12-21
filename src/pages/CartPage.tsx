import { Box, Grid } from '@mui/material';
import { Product } from '../types/Types';
import { useEffect, useState } from 'react';
import { getProduct } from '../services/ProductsApi';
import CartHeader from '../components/CartHeader';
import { ProductPerPage } from '../types/Types';

//Type

type storeItem = {
  id: number;
  quantity: number;
};

// Working with localStorage. Change in future
const key = 'OA_cart';
const store = JSON.parse(localStorage?.getItem(key) || '{}');
const storeTempArr: storeItem[] = [];
for (const [productId, value] of Object.entries<string>(store)) {
  storeTempArr.push({ id: +productId, quantity: +value });
}

//////////////////

const CartPage = () => {
  const [productArr, setProductArr] = useState<Product[]>();

  useEffect(() => {
    (async () => {
      const productsToRender: Product[] = [];
      const result = await Promise.all(storeTempArr.map((item) => getProduct(item.id)));
      result.forEach((item) => {
        if (item) {
          productsToRender.push({ ...item, quantity: store[item.id] });
        }
      });
      if (productsToRender.length) {
        setProductArr(productsToRender);
      }
    })();
  }, [storeTempArr]);

  const [page, setPage] = useState(1);
  let curPage = page;

  function onBackHandler(): void {
    if (curPage > 1) {
      curPage--;
      setPage(curPage);
    }
  }

  function onForwardHandler(): void {
    if (productArr && curPage < Math.ceil(productArr.length / ProductPerPage.perPage)) {
      curPage++;
      setPage(curPage);
    }
  }

  if (productArr) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <CartHeader
            page={page}
            onBackHandler={onBackHandler}
            onForwardHandler={onForwardHandler}
            itemsNum={productArr.length}
          />
          {productArr
            .filter((_, index) => {
              return index >= (page - 1) * ProductPerPage.perPage && index < page * ProductPerPage.perPage;
            })
            .map((item) => {
              return <Box key={`${item.id}`}>{item.title}</Box>;
            })}
        </Grid>
      </Grid>
    );
  } else return <h1>Cart is empty</h1>;
};

export default CartPage;
