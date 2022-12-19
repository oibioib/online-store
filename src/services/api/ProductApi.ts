import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import IProducts from '../../interfaces/ProductInterface';

export function DescriptionPage() {
  const productsID: number = +window.location.href.toString().slice(-1) - 1;

  const [productsArr, setProductsArr] = useState<IProducts[]>([]);

  useEffect(() => {
    async function tempFunction() {
      const tempArr = await axios.get('https://dummyjson.com/products?limit=10');
      setProductsArr(tempArr.data.products);
    }
    tempFunction();
  }, []);

  return productsArr[productsID];

  // return (
  //   <div className="m-5">
  //     <div>{productsArr[productsID]?.title}</div>
  //     <div>{productsArr[productsID]?.description}</div>
  //     <div>
  //       <img className="img" src={productsArr[productsID]?.images[0]} alt="" />
  //     </div>
  //   </div>
  // );
}
