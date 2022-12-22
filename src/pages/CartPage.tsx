import { Grid } from '@mui/material';
import { Product } from '../types/Types';
import { useEffect, useState } from 'react';
import { getProduct } from '../services/ProductsApi';
import CartHeader from '../components/CartHeader';
import { ProductPerPage } from '../types/Types';
import CartProducts from '../components/CartProducts';
import { useLocation } from 'react-router';

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
  const location = useLocation()?.search;
  const urlParams = new URLSearchParams(location);
  let limitURL = '';
  let pageURL = '';
  if (urlParams.get('limit') != null) {
    limitURL = urlParams.get('limit') as string;
  }

  if (urlParams.get('page') != null) {
    pageURL = urlParams.get('page') as string;
  }
  const page = pageURL ? +pageURL : 1;
  const itemPerPage = limitURL ? +limitURL : ProductPerPage.perPage;

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
  }, [storeTempArr, location]);

  if (productArr) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <CartHeader length={productArr.length} />
          {productArr
            .filter((_, index) => {
              return index >= (page - 1) * itemPerPage && index < page * itemPerPage;
            })
            .map((item, index) => {
              return <CartProducts key={item.id} {...item} index={index + (page - 1) * itemPerPage} />;
            })}
        </Grid>
      </Grid>
    );
  } else return <h1>Cart is empty</h1>;
};

export default CartPage;
