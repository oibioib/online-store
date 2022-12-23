import { Grid } from '@mui/material';
import { Product, ProductPerPage, storeItem } from '../types/Types';
import { useEffect, useState } from 'react';
import { getProduct } from '../services/ProductsApi';
import CartHeader from '../components/CartHeader';
import CartProducts from '../components/CartProducts';
import { useLocation, useNavigate } from 'react-router';
import SummaryCart from '../components/SummaryCart';

const CartPage = () => {
  ////////////////
  const key = 'OA_cart';
  const [store, setStore] = useState<string>(() => {
    return JSON.parse(localStorage?.getItem(key) || '{}');
  });
  const [productArr, setProductArr] = useState<Product[]>();
  const location = useLocation()?.search;
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location);
  let limitParam = '';
  let pageParam = '';
  if (urlParams.get('limit') != null) {
    limitParam = urlParams.get('limit') as string;
  }

  if (urlParams.get('page') != null) {
    pageParam = urlParams.get('page') as string;
  }
  const page = pageParam ? +pageParam : 1;
  const itemPerPage = limitParam ? +limitParam : ProductPerPage.perPage;

  window.addEventListener('build', () => {
    setStore(JSON.parse(localStorage?.getItem(key) || '{}'));
    if (productArr && productArr?.length - 1 < +limitParam * +pageParam && +pageParam > 1) {
      const newPath = location.replace(`page=${pageParam}`, `page=${(+pageParam - 1).toString()}`);
      navigate(newPath);
    }
  });

  useEffect(() => {
    (async () => {
      // Working with localStorage. Change in future

      const storeTempArr: storeItem[] = [];
      for (const [productId, value] of Object.entries<string>(store)) {
        storeTempArr.push({ id: +productId, quantity: +value });
      }
      //////////////////
      const productsToRender: Product[] = [];
      const result = await Promise.all(storeTempArr.map((item) => getProduct(item.id)));
      result.forEach((item) => {
        if (item) {
          productsToRender.push({ ...item, quantity: +store[item.id] });
        }
      });
      if (productsToRender.length) {
        setProductArr(productsToRender);
      } else {
        navigate('/cart');
        setProductArr(undefined);
      }
    })();
  }, [store, navigate]);

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
        <Grid item xs={4}>
          <SummaryCart />
        </Grid>
      </Grid>
    );
  } else return <h1>Cart is empty</h1>;
};

export default CartPage;
