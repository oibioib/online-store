// TODO
// Can return data from here. I add a tsx as example
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import IProducts from '../../interfaces/ProductInterface';

function ProductsDraft() {
  const [productsArr, setProductsArr] = useState<IProducts[]>([]);

  useEffect(() => {
    async function tempFunction() {
      const tempArr = await axios.get('https://dummyjson.com/products?limit=10');
      setProductsArr(tempArr.data.products);
    }
    tempFunction();
  }, []);

  return (
    <div className="">
      {productsArr?.map((el: IProducts) => {
        return (
          <Link key={el.id} to={`product/${el.id}`} className="">
            <div>{el.title}</div>
            <div>{el.description}</div>
            <div>
              <img className="" src={el.images[0]} alt="" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductsDraft;
