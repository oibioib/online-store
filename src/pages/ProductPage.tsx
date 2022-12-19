import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DescriptionPage } from '../services/api/ProductApi';

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
    </div>
  );
};

export default ProductPage;
