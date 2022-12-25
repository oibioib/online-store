import { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Product, ProductDetailsLabels } from '../types/ProductTypes';
import { CatalogParams, defaultSortCb, defaultSortId, SortParam, sorts, ViewParams } from '../types/CatalogTypes';

import { Button, FormControl, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import {
  ShoppingCartIcon,
  ViewListRoundedIcon,
  GridViewRoundedIcon,
  ContentCopyIcon,
  RestartAltIcon,
  ContentCopyRoundedIcon,
} from '../theme/Icons';

import { productsContext } from '../Context/Context';
import Filter from '../components/Filter';

const MainPage = () => {
  const productsAll = useContext(productsContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [view, setView] = useState<string>(ViewParams.Default);
  const [sort, setSort] = useState<number>(defaultSortId);
  const [search, setSearch] = useState<string>('');
  const [canCopyUrlToClipboard, setCanCopyUrlToClipboard] = useState<boolean>(true);

  const [params, setParams] = useSearchParams();
  const viewParam = params.get(CatalogParams.View);
  const sortParam = params.get(CatalogParams.Sort);
  const searchParam = params.get(CatalogParams.Search);

  const memoSorts = useMemo(() => {
    return sorts.map((item) => (
      <MenuItem key={item.id} value={item.id}>
        {item.label}
      </MenuItem>
    ));
  }, []);

  useEffect(() => {
    setProducts(productsAll);
  }, [productsAll]);

  useEffect(() => {
    if (viewParam) {
      const viewParamsList: string[] = Object.values(ViewParams);
      viewParamsList.includes(viewParam) ? setView(viewParam) : setView(ViewParams.Default);
    } else {
      setView(ViewParams.Default);
    }
  }, [viewParam]);

  useEffect(() => {
    if (sortParam) {
      const sortCurrent = sorts.find((item) => item.value === sortParam);
      setSort(sortCurrent ? sortCurrent.id : defaultSortId);
    } else {
      setSort(defaultSortId);
    }
  }, [sortParam]);

  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam);
    } else setSearch('');
  }, [searchParam]);

  const viewChangeHandler = (viewClicked: ViewParams) => {
    setView(viewClicked);
    params.set(CatalogParams.View, viewClicked);
    setParams(params);
  };

  const sortChangeHandler = (e: SelectChangeEvent<SortParam['id']>) => {
    const clickValue = +e.target.value;
    const sortSelected = sorts.find((item) => item.id === clickValue);
    if (sortSelected) {
      setSort(clickValue);
      params.set(CatalogParams.Sort, sortSelected.value);
      setParams(params);
    }
  };

  const searchChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    searchValue ? params.set(CatalogParams.Search, searchValue) : params.delete(CatalogParams.Search);
    setParams(params);
  };

  const copyUrlToClipboardHandler = async () => {
    if (canCopyUrlToClipboard) {
      setCanCopyUrlToClipboard(false);
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setTimeout(() => {
        setCanCopyUrlToClipboard(true);
      }, 800);
    }
  };

  const resetSearchParamsHandler = () => {
    const pageParams = [CatalogParams.Search, CatalogParams.View, CatalogParams.Sort];
    pageParams.forEach((param) => {
      params.delete(param);
    });
    setParams(params);

    setView(ViewParams.Default);
    setSort(defaultSortId);
    setSearch('');
    // setSelectedBrands([]);
  };

  const sortProductsCb = (a: Product, b: Product) => {
    const sortCurrent = sorts.find((item) => item.id === sort);
    if (sortCurrent) {
      return sortCurrent.cb(a, b);
    }
    return defaultSortCb(a, b);
  };

  const searchProductsCb = (product: Product) => {
    const searchFields = [
      'title',
      'description',
      'price',
      'brand',
      'rating',
      'stock',
      'discountPercentage',
      'category',
    ];

    const productFileds = searchFields.map((searchField) => {
      const key = searchField as keyof Product;
      return key in product ? product[key] : '';
    });

    return productFileds.some((field) => field.toString().toLowerCase().includes(search));
  };

  const getProductsShown = (products: Product[]) => products.filter(searchProductsCb);

  const productsToRender = getProductsShown(products)
    .sort(sortProductsCb)
    .map((item) => {
      return view === ViewParams.Full ? (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
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

  return (
    <Grid container>
      <Grid container item spacing={2}>
        <Grid item container xs={3} direction="column">
          <Grid item mb={2}>
            <Button
              startIcon={canCopyUrlToClipboard ? <ContentCopyIcon /> : <ContentCopyRoundedIcon />}
              size="large"
              onClick={copyUrlToClipboardHandler}>
              {canCopyUrlToClipboard ? 'Copy' : 'Copied!'}
            </Button>
            <Button startIcon={<RestartAltIcon />} size="large" onClick={resetSearchParamsHandler}>
              Reset
            </Button>
          </Grid>
          <Grid item>
            <Filter allProducts={products} />
          </Grid>
        </Grid>
        <Grid item xs={9}>
          {/* right */}
          <Grid container item>
            <Grid container item spacing={{ xs: 2, md: 3 }} alignItems="center" justifyContent="space-between" mb={2}>
              <Grid item>
                <FormControl fullWidth>
                  <Select id="sort-select" value={sort} onChange={sortChangeHandler} size="small">
                    {memoSorts}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <TextField
                    id="search"
                    value={search}
                    variant="outlined"
                    onChange={searchChangeHandler}
                    size="small"
                  />
                </FormControl>
              </Grid>
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
          </Grid>
          <Grid container item spacing={{ xs: 2 }}>
            {productsToRender.length ? (
              productsToRender
            ) : (
              <Grid item xs>
                <Paper
                  elevation={5}
                  sx={{
                    '&:hover': {
                      boxShadow: 8,
                    },
                    mb: 0,
                    backgroundColor: 'white',
                    minHeight: 250,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography variant="h6" component="span">
                    Ups! No product founded
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainPage;
