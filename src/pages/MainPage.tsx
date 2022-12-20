import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/ProductsApi';
import { Product, ProductDetailsLabels } from '../types/Types';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const MainPage = () => {
  const [params] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  // const [isLoading, setLoading] = useState(false);

  const s = params.get('string');
  const n = params.get('number');

  useEffect(() => {
    // setLoading(true);
    (async () => {
      const result = await getProducts();
      if (result) {
        setProducts(result);
        console.log('useEffect - result', result);
      }
      // setLoading(false);
    })();
  }, []);

  const productsData = products.map((item) => {
    return (
      <Grid item key={item.id} xs={12} sm={6} lg={4}>
        <Paper elevation={5} sx={{ mb: 2, backgroundColor: 'white', overflow: 'hidden', height: '100%' }}>
          <Box
            sx={{
              width: '100%',
              height: 300,
              backgroundImage: 'url(' + item.thumbnail + ')',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              boxShadow: 5,
            }}
          />
          <Typography variant="h6" component="p" sx={{ m: 2, fontWeight: 600 }}>
            {item.title}
          </Typography>
          <Box>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0 }}>
              {ProductDetailsLabels.Brand}: {item.brand}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0 }}>
              {ProductDetailsLabels.Category}: {item.category}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0 }}>
              {ProductDetailsLabels.Rating}: {item.rating}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0 }}>
              {ProductDetailsLabels.DiscountPercentage}: {item.discountPercentage}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0 }}>
              {ProductDetailsLabels.Stock}: {item.stock}
            </Typography>
          </Box>
          <Typography gutterBottom variant="h5" component="div" sx={{ p: 1, fontWeight: 600 }}>
            {ProductDetailsLabels.Currency} {item.price}
          </Typography>
          <Grid container gap={1} justifyContent="center" alignItems="center">
            <Button variant="contained" size="large" startIcon={<ShoppingCartIcon />}>
              Add to cart
            </Button>
            <Button size="large">Details</Button>
          </Grid>
        </Paper>
      </Grid>
    );
  });

  return (
    <div>
      <h1>Main</h1>
      {!(s || n) ? <p>No query params</p> : null}
      {s ? <p>String param - {s}</p> : null}
      {n ? <p>Number param - {n}</p> : null}

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {productsData}
      </Grid>
    </div>
  );
};

export default MainPage;
