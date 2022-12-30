import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Breadcrumbs, Grid, Paper, Box, ImageList, ImageListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Image from 'mui-image';
import { getProduct } from '../services/ProductsApi';
import { Product, ProductDetailsLabels } from '../types/ProductTypes';
import AddToCartButton from '../components/AddToCartButton';
import BuyNowButton from '../components/BuyNowButton';

const DescriptionItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: 'solid black 1px',
  marginTop: '0.5rem',
}));

const ProductPage = () => {
  const id: string | undefined = useParams().id;
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [imageUrl, setImageUrl] = useState<string>();

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    const clickedURL = event.target as HTMLImageElement;
    setImageUrl(`${clickedURL.src}`);
  }

  useEffect(() => {
    if (id && +id === 101) {
      navigate('/error', { replace: true });
    }
    if (id) {
      (async () => {
        const result = await getProduct(+id);
        if (result) {
          setProduct(result);
          setImageUrl(result.images[0]);
        }
      })();
    }
  }, [id, navigate]);

  if (product) {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box component="div" sx={{ p: 2, display: 'flex', justifyContent: 'center' }} role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">Store</Link>
                <Link to="/">{product.brand}</Link>
                <Link to="/">{product.category}</Link>
                <Typography color="text.primary">{product.title}</Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
          <Grid item xs={12} container spacing={2} sx={{ border: 'solid black 1px', margin: '2rem 3rem' }}>
            <Grid item xs={12}>
              <Box>{product.title}</Box>
            </Grid>
            <Grid item xs={2} md={1}>
              <Box onClick={handleClick}>
                {}
                <ImageList cols={1}>
                  {product.images.map((item) => (
                    <ImageListItem sx={{ marginTop: '0.5rem', border: 'solid black 1px' }} key={item}>
                      <img src={`${item}`} srcSet={`${item}`} alt={item} loading="lazy" />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box>
                <Image src={`${imageUrl}`} alt={`${product.title}`} />
              </Box>
            </Grid>
            <Grid item xs={4} md={5}>
              <DescriptionItem>
                <div>{ProductDetailsLabels.Description}</div>
                <div>{product.description}</div>
              </DescriptionItem>
              <DescriptionItem>
                <div>{ProductDetailsLabels.DiscountPercentage}</div>
                <div>{product.discountPercentage}</div>
              </DescriptionItem>
              <DescriptionItem>
                <div>{ProductDetailsLabels.Rating}</div>
                <div>{product.rating}</div>
              </DescriptionItem>
              <DescriptionItem>
                <div>{ProductDetailsLabels.Stock}</div>
                <div>{product.stock}</div>
              </DescriptionItem>
              <DescriptionItem>
                <div>{ProductDetailsLabels.Brand}</div>
                <div>{product.brand}</div>
              </DescriptionItem>
              <DescriptionItem>
                <div>{ProductDetailsLabels.Category}</div>
                <div>{product.category}</div>
              </DescriptionItem>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                  {ProductDetailsLabels.Currency} {product.price}.00
                </div>
                <AddToCartButton id={id ? +id : 0} />
                <BuyNowButton />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  } else return <></>;
};

export default ProductPage;
