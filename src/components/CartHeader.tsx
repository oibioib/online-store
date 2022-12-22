import { Box, Button, Input } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductPerPage } from '../types/Types';

interface CartHeader {
  length: number;
}

const CartHeader = (props: CartHeader) => {
  const location = useLocation()?.search;
  const urlParams = new URLSearchParams(location);
  let limitURL = '';
  let pageURL = '';
  let itemPerPage: number;
  if (urlParams.get('limit') != null) {
    limitURL = urlParams.get('limit') as string;
  }

  if (urlParams.get('page') != null) {
    pageURL = urlParams.get('page') as string;
  }
  const page = pageURL ? +pageURL : 1;
  let curPage = page;
  const limit = limitURL ? +limitURL : ProductPerPage.perPage;

  const navigate = useNavigate();
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let newPath = location;
    itemPerPage = +event.target.value;
    if (location && location.includes('page=')) {
      newPath += '&';
    } else newPath += '?';
    if (location && location.includes('limit=')) {
      newPath = location.replace(`limit=${limitURL}`, `limit=${itemPerPage.toString()}`);
    } else newPath += `limit=${itemPerPage.toString()}`;
    navigate(newPath);
  }

  function onBackHandler(): void {
    if (curPage > 1) {
      curPage--;
      let newPath = location;
      if (location && location.includes('limit=')) {
        newPath += '&';
      } else newPath += '?';
      if (location && location.includes('page=')) {
        newPath = location.replace(`page=${pageURL}`, `page=${curPage.toString()}`);
      } else newPath += `page=${curPage.toString()}`;
      navigate(newPath);
    }
  }

  function onForwardHandler(): void {
    if (props.length && curPage < Math.ceil(props.length / limit)) {
      curPage++;
      let newPath = location;
      if (location && location.includes('limit=')) {
        newPath += '&';
      } else newPath += '?';
      if (location && location.includes('page=')) {
        newPath = location.replace(`page=${pageURL}`, `page=${curPage.toString()}`);
      } else newPath += `page=${curPage.toString()}`;
      navigate(newPath);
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>Products in Cart</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '7rem' }}>
          ITEMS: <Input size="small" type="number" onChange={onChangeHandler} defaultValue={`${limit}`} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>Page:</Box>
          <Button onClick={onBackHandler}>{`<`}</Button>
          <Box>{page}</Box>
          <Button onClick={onForwardHandler}>{`>`}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartHeader;
