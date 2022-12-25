import { Product } from '../types/ProductTypes';

export enum CatalogParams {
  View = 'view',
  Sort = 'sort',
  Search = 'search',
}

export enum ViewParams {
  Default = 'full',
  Full = 'full',
  Short = 'short',
}

export type SortParam = {
  id: number;
  value: string;
  label: string;
  cb: (a: Product, b: Product) => number;
};

export const sorts: SortParam[] = [
  {
    id: 1,
    value: 'price-asc',
    label: 'Price ASC',
    cb: (a, b) => a.price - b.price,
  },
  {
    id: 2,
    value: 'price-desc',
    label: 'Price DESC',
    cb: (a, b) => b.price - a.price,
  },
  {
    id: 3,
    value: 'rating-asc',
    label: 'Rating ASC',
    cb: (a, b) => a.rating - b.rating,
  },
  {
    id: 4,
    value: 'rating-desc',
    label: 'Rating DESC',
    cb: (a, b) => b.rating - a.rating,
  },
];

export const defaultSortId = 1;
export const defaultSortCb = (a: Product, b: Product) => b.id - a.id;

export type FilterCheckbox = {
  id: number;
  title: string;
  products: number;
  isCheked: boolean;
};

export type Dictionary<T, N> = { [key: string]: T | N | boolean };

export type Filters = 'brand';
