import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DescriptionPage } from '../services/api/ProductApi';
import { Typography, Breadcrumbs } from '@mui/material';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const ProductPage = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const product = DescriptionPage();

  useEffect(() => {
    if (id && +id === 101) {
      navigate('/error', { replace: true });
    }
  });

  console.log(DescriptionPage());

  return (
    <div className="product">
      <h1>Product id - {id}</h1>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Store</Link>
          <Link to="/">{product?.brand}</Link>
          <Link to="/">{product?.category}</Link>
          <Typography color="text.primary">{product?.title}</Typography>
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default ProductPage;
