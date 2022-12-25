import { useEffect, useMemo, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import { Product } from '../types/ProductTypes';
import { FilterCheckbox, Filters } from '../types/CatalogTypes';

const FilterWithCheckbox = ({ allProducts, filterName }: { allProducts: Product[]; filterName: string }) => {
  const key = filterName as Filters;
  const [filterData, setFilterData] = useState<FilterCheckbox[]>([]);

  const memoFilterItems = useMemo(() => {
    const data: FilterCheckbox[] = [];

    const uniqueValues = Array.from(
      new Set<FilterCheckbox['title']>(
        allProducts.map<FilterCheckbox['title']>((product: Product) => {
          const key = filterName as Filters;
          return product[key];
        })
      )
    ).sort();

    uniqueValues.forEach((uniqueValue, i) => {
      const productsOfFilter = allProducts.filter((product) => {
        return product[key] === uniqueValue;
      }).length;
      data.push({
        id: i,
        title: uniqueValue,
        products: productsOfFilter,
        isCheked: false,
      });
    });

    return data;
  }, [allProducts, filterName, key]);

  useEffect(() => {
    setFilterData(memoFilterItems);
  }, [memoFilterItems]);

  // const selectFilterCb = (product: Product) => {
  //   if (!selectedFilters.length) return true;

  //   const brandFindedInMemo = memoBrands.find((brand) => brand.name === product.brand);
  //   if (brandFindedInMemo) {
  //     return selectedFilters.includes(brandFindedInMemo.id);
  //   }
  // };

  const checkboxChangeState = (id: number) => {
    console.log('click filter ' + filterName + 'id ' + id);
    setFilterData((filterData) =>
      filterData.map((filterItemData) => {
        return filterItemData.id === id ? { ...filterItemData, isCheked: !filterItemData.isCheked } : filterItemData;
      })
    );
  };

  const filterItems = filterData.map((item) => {
    // const filterItemProductsCount = allProducts.filter((product) => product[key] === item.title).length;

    return (
      <Grid key={item.id} item container justifyContent="space-between" alignItems="center">
        <Grid item ml={1}>
          <FormControlLabel
            key={item.id}
            control={<Checkbox sx={{ padding: 0.5 }} />}
            checked={item.isCheked}
            label={item.title}
            onChange={() => checkboxChangeState(item.id)}
            sx={{ color: item.isCheked ? 'inherit' : 'grey' }}
          />
        </Grid>
        <Grid item mr={1}>
          <Typography
            color={item.isCheked ? 'primary' : 'body1'}
            sx={{ fontWeight: item.isCheked ? 'bold' : 'inherit' }}>
            {/* {filterItemProductsCount} / {item.products} */}
            {item.products}
          </Typography>
        </Grid>
      </Grid>
    );
  });

  return (
    <FormGroup>
      <Grid container sx={{ overflow: 'auto', maxHeight: 300 }}>
        {filterItems}
      </Grid>
    </FormGroup>
  );
};

const Filter = ({ allProducts }: { allProducts: Product[] }) => {
  return <FilterWithCheckbox allProducts={allProducts} filterName="brand" />;
};

export default Filter;
