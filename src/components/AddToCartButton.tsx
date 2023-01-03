import { ShoppingCartIcon } from '../theme/Icons';
import { Button } from '@mui/material';
import { useState } from 'react';

type AddToCartButton = {
  id: number;
};

const AddToCartButton = (props: AddToCartButton) => {
  //Get the name from theme Experimental work with cart
  const key = 'OA_cart';
  const [productsInLocalStorage, setProductsInLocalStorage] = useState(localStorage.getItem(key));
  const productsInLocalStorageParsed = productsInLocalStorage ? JSON.parse(productsInLocalStorage) : {};

  //////////////////////////

  function addToLocalStorage() {
    if (props.id) {
      localStorage.setItem(key, JSON.stringify({ ...productsInLocalStorageParsed, [props.id]: 1 }));
      setProductsInLocalStorage(JSON.stringify({ ...productsInLocalStorageParsed, [props.id]: 1 }));
    }
  }

  function dropFromLocalStorage() {
    delete productsInLocalStorageParsed[`${props.id}`];
    localStorage.setItem(key, JSON.stringify({ ...productsInLocalStorageParsed }));
    setProductsInLocalStorage(JSON.stringify({ ...productsInLocalStorageParsed }));
  }
  if (productsInLocalStorageParsed[`${props.id}`]) {
    return (
      <Button onClick={dropFromLocalStorage} variant="contained">
        Drop
      </Button>
    );
  } else {
    return (
      <Button onClick={addToLocalStorage} variant="contained" startIcon={<ShoppingCartIcon />}>
        Add to cart
      </Button>
    );
  }
};

export default AddToCartButton;
