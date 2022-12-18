import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const id = useParams().id;
  return (
    <div className="product">
      <h1>Product id - {id}</h1>
    </div>
  );
};

export default ProductPage;
