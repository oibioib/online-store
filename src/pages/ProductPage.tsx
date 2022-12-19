import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductPage = () => {
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    if (id && +id === 101) {
      navigate('/error', { replace: true });
    }
  });

  return (
    <div className="product">
      <h1>Product id - {id}</h1>
    </div>
  );
};

export default ProductPage;
