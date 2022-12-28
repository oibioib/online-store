import { Grid } from '@mui/material';
// import { Product, CartSettings, storeItem } from '../types/Types';
import { useEffect, useState } from 'react';
import { getProduct } from '../services/ProductsApi';
import CartHeader from '../components/CartHeader';
import CartProducts from '../components/CartProducts';
import { useNavigate } from 'react-router';
import SummaryCart from '../components/SummaryCart';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/ProductTypes';
import { CartSettings, storeItem } from '../types/CartTypes';

const CartPage = () => {
  ////////////////
  const key = 'OA_cart';
  const [store, setStore] = useState<string>(() => {
    return JSON.parse(localStorage?.getItem(key) || '{}');
  });
  const [productArr, setProductArr] = useState<Product[]>();
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
  // const location = useLocation()?.search;
  const navigate = useNavigate();
  // const searchParams = new URLSearchParams(location);

  const [searchParams, setSearchParams] = useSearchParams();
  let limitParam = '';
  let pageParam = '';
  if (searchParams.get('limit') != null) {
    limitParam = searchParams.get('limit') as string;
  }

  if (searchParams.get('page') != null) {
    pageParam = searchParams.get('page') as string;
  }
  const page = pageParam ? +pageParam : 1;
  const itemPerPage = limitParam ? +limitParam : CartSettings.perPage;

  window.addEventListener('build', () => {
    setStore(JSON.parse(localStorage?.getItem(key) || '{}'));
    if (productArr && productArr?.length - 1 < +limitParam * +pageParam && +pageParam > 1) {
      // const newPath = location.replace(`page=${pageParam}`, `page=${(+pageParam - 1).toString()}`);
      // navigate(newPath);
      const tempNewPath = { page: (+pageParam - 1).toString(), limit: limitParam };
      setSearchParams(tempNewPath);
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
  }, [store, navigate, totalSum]);

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
          <SummaryCart totalSum={totalSum ? totalSum : 0} totalItems={totalItems ? totalItems : 0} />
        </Grid>
      </Grid>
    );
  } else return <h1>Cart is empty</h1>;
};

export default CartPage;
