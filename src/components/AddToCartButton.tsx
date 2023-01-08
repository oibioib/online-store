import { ShoppingCartIcon } from '../theme/Icons';
import { Button } from '@mui/material';
import { useState } from 'react';
import { Product } from '../types/ProductTypes';

const AddToCartButton = ({ id }: { id: Product['id'] }) => {
  const key = 'OA_cart';
  const [productsInLocalStorage, setProductsInLocalStorage] = useState(localStorage.getItem(key));
  const productsInLocalStorageParsed = productsInLocalStorage ? JSON.parse(productsInLocalStorage) : {};

  function addToLocalStorage() {
    if (id) {
      localStorage.setItem(key, JSON.stringify({ ...productsInLocalStorageParsed, [id]: 1 }));
      setProductsInLocalStorage(JSON.stringify({ ...productsInLocalStorageParsed, [id]: 1 }));
    }
  }

  function dropFromLocalStorage() {
    delete productsInLocalStorageParsed[`${id}`];
    localStorage.setItem(key, JSON.stringify({ ...productsInLocalStorageParsed }));
    setProductsInLocalStorage(JSON.stringify({ ...productsInLocalStorageParsed }));
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
