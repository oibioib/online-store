import { ShoppingCartIcon } from '../theme/Icons';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Product } from '../types/ProductTypes';

const AddToCartButton = ({ id }: { id: Product['id'] }) => {
  const key = 'OA_cart';
  const [productsInLocalStorage, setProductsInLocalStorage] = useState(localStorage.getItem(key));
  const productsInLocalStorageParsed = productsInLocalStorage ? JSON.parse(productsInLocalStorage) : {};

  window.addEventListener('StorageChanged', () => {
    setProductsInLocalStorage(localStorage.getItem(key));
  });

  /* TODO:
    * - используйте Function expression в ES6 стиле, e.g. const addToLocalStorage = () => { ... }
    * - логику работы с localstorage следовалы бы вынести в некий сервис, а из компонента дергать только его метод, например storage.set(...), storage.get(...).
    * - использование addEventListener, dispatchEvent не лучшее решение. Как обсуждали - сделовало бы использовать общий контекст корзины с методами ее обновления.
   */

  function addToLocalStorage() {
    if (id) {
      localStorage.setItem(key, JSON.stringify({ ...productsInLocalStorageParsed, [id]: 1 }));
      setProductsInLocalStorage(JSON.stringify({ ...productsInLocalStorageParsed, [id]: 1 }));
      window.dispatchEvent(new Event('StorageChanged'));
    }
  }

  function dropFromLocalStorage() {
    delete productsInLocalStorageParsed[`${id}`];
    localStorage.setItem(key, JSON.stringify({ ...productsInLocalStorageParsed }));
    setProductsInLocalStorage(JSON.stringify({ ...productsInLocalStorageParsed }));
    window.dispatchEvent(new Event('StorageChanged'));
  }

  if (productsInLocalStorageParsed[`${id}`]) {
    return (
      <Button onClick={dropFromLocalStorage} variant="contained" size="large">
        Drop
      </Button>
    );
  } else {
    return (
      <Button onClick={addToLocalStorage} variant="contained" size="large" startIcon={<ShoppingCartIcon />}>
        Add to cart
      </Button>
    );
  }
};

export default AddToCartButton;
