import { Box, Button, Input } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductPerPage } from '../types/Types';
import { ICartHeader } from '../types/Types';

const CartHeader = (props: ICartHeader) => {
  const location = useLocation()?.search;
  const urlParams = new URLSearchParams(location);
  let limitParam = '';
  let pageParam = '';
  let itemPerPage: number;
  if (urlParams.get('limit') != null) {
    limitParam = urlParams.get('limit') as string;
  }

  if (urlParams.get('page') != null) {
    pageParam = urlParams.get('page') as string;
  }
  const page = pageParam ? +pageParam : 1;
  let curPage = page;
  const limit = limitParam ? +limitParam : ProductPerPage.perPage;
  const navigate = useNavigate();
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let newPath = location;
    itemPerPage = +event.target.value;
    if (location && location.includes('page=')) {
      newPath += '&';
    } else newPath += '?';
    if (location && location.includes('limit=')) {
      newPath = location.replace(`limit=${limitParam}`, `limit=${itemPerPage.toString()}`);
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
        newPath = location.replace(`page=${pageParam}`, `page=${curPage.toString()}`);
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
        newPath = location.replace(`page=${pageParam}`, `page=${curPage.toString()}`);
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
