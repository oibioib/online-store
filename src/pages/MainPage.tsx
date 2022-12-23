import { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product, ProductDetailsLabels } from '../types/ProductTypes';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

import { productsContext } from '../Context/Context';
import { CatalogParams, ViewParams } from '../types/CatalogTypes';

const MainPage = () => {
  const productsAll = useContext(productsContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<string>(ViewParams.Default);
  const [params, setParams] = useSearchParams();

  const viewParam = params.get(CatalogParams.View);
  console.log('MainPage - viewParam', viewParam);

  useEffect(() => {
    setProducts(productsAll);
  }, [productsAll]);

  useEffect(() => {
    if (viewParam) {
      const viewParamsList: string[] = Object.values(ViewParams);
      viewParamsList.includes(viewParam) ? setView(viewParam) : setView(ViewParams.Default);
    }
  }, [viewParam]);

  const productsToRender = products.map((item) => {
    return view === ViewParams.Full ? (
      <Grid item key={item.id} xs={12} sm={6} lg={4} xl={3}>
        <Paper
          elevation={5}
          sx={{
            '&:hover': {
              boxShadow: 8,
            },
            mb: 2,
            backgroundColor: 'white',
            overflow: 'hidden',
            height: '100%',
          }}>
          <Box
            m={2}
            borderRadius={1}
            sx={{
              height: 250,
              backgroundImage: 'url(' + item.thumbnail + ')',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              boxShadow: 3,
            }}
          />
          <Typography variant="h6" component="p" sx={{ m: 2 }}>
            {item.title}
          </Typography>
          <Box>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0, lineHeight: 1.2 }}>
              {ProductDetailsLabels.Brand}: {item.brand}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0, lineHeight: 1.2 }}>
              {ProductDetailsLabels.Category}: {item.category}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0, lineHeight: 1.2 }}>
              {ProductDetailsLabels.Rating}: {item.rating}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0, lineHeight: 1.2 }}>
              {ProductDetailsLabels.DiscountPercentage}: {item.discountPercentage}
            </Typography>
            <Typography gutterBottom variant="body2" component="p" sx={{ m: 0, lineHeight: 1.2 }}>
              {ProductDetailsLabels.Stock}: {item.stock}
            </Typography>
          </Box>
          <Typography gutterBottom variant="h5" component="div" sx={{ p: 1 }}>
            {ProductDetailsLabels.Currency} {item.price}
          </Typography>
          <Grid container gap={1} justifyContent="center" alignItems="center">
            <Button variant="contained" size="large" startIcon={<ShoppingCartIcon />}>
              Add to cart
            </Button>
            <Button size="large" component={Link} to={'/product/' + item.id}>
              Details
            </Button>
          </Grid>
        </Paper>
      </Grid>
    ) : (
      <Grid item key={item.id} xs={12}>
        <Paper
          elevation={5}
          sx={{
            '&:hover': {
              boxShadow: 8,
            },
            mb: 0,
            backgroundColor: 'white',
            overflow: 'hidden',
          }}>
          <Grid container spacing={{ xs: 2 }} sx={{ p: 2 }} columns={{ xs: 2 }}>
            <Grid item>
              <Box
                borderRadius={1}
                sx={{
                  width: 130,
                  height: 130,
                  backgroundImage: 'url(' + item.thumbnail + ')',
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  boxShadow: 3,
                }}
              />
            </Grid>
            <Grid container item xs gap={1}>
              <Grid item>
                <Grid container direction="column">
                  <Grid item sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" component="p" sx={{ mb: 0 }}>
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid item sx={{ textAlign: 'left' }}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography gutterBottom variant="body2" component="span" sx={{ m: 0, lineHeight: 1.2 }}>
                          {ProductDetailsLabels.Brand}: {item.brand}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {' '}
                        <Typography gutterBottom variant="body2" component="span" sx={{ m: 0, lineHeight: 1.2 }}>
                          {ProductDetailsLabels.Category}: {item.category}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="body2" component="span" sx={{ m: 0, lineHeight: 1.2 }}>
                          {ProductDetailsLabels.Rating}: {item.rating}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="body2" component="span" sx={{ m: 0, lineHeight: 1.2 }}>
                          {ProductDetailsLabels.DiscountPercentage}: {item.discountPercentage}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography gutterBottom variant="body2" component="span" sx={{ m: 0, lineHeight: 1.2 }}>
                          {ProductDetailsLabels.Stock}: {item.stock}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sx={{ textAlign: 'left' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ mt: 1 }}>
                      {ProductDetailsLabels.Currency} {item.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs alignItems="center">
                <Grid container gap={1} justifyContent="flex-end" alignItems="center">
                  <Button variant="contained" startIcon={<ShoppingCartIcon />}>
                    Add to cart
                  </Button>
                  <Button component={Link} to={'/product/' + item.id}>
                    Details
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  });

  const viewChangeHandler = (viewClicked: ViewParams) => {
    setView(viewClicked);
    params.set(CatalogParams.View, viewClicked);
    setParams(params);
  };

  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center" justifyContent="flex-end">
        <Grid item>Products: {productsToRender.length}</Grid>
        <Grid item>
          <Button size="large" sx={{ minWidth: 'unset' }} onClick={() => viewChangeHandler(ViewParams.Short)}>
            <ViewListRoundedIcon />
          </Button>
          <Button size="large" sx={{ minWidth: 'unset' }} onClick={() => viewChangeHandler(ViewParams.Full)}>
            <GridViewRoundedIcon />
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2 }}>
        {productsToRender}
      </Grid>
    </div>
  );
};

export default MainPage;
