import { Box } from '@mui/material';
import { Product } from '../types/Types';
import { useEffect, useState } from 'react';
import { getProduct } from '../services/ProductsApi';

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

console.log(store);

//////////////////

type Quantity = {
  quantity: number;
};
type ProductQuantity = Product & Quantity;

const CartPage = () => {
  const [productArr, setProductArr] = useState<ProductQuantity[]>();

  useEffect(() => {
    (async () => {
      const productsToRender: ProductQuantity[] = [];
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
  console.log(productArr);

  if (productArr) {
    return (
      <>
        The cart
        {productArr?.map((item) => {
          return <div key={`${item.id}`}>{item.title}</div>;
        })}
      </>
    );
  } else return <h1>Cart is empty</h1>;
};

export default CartPage;
