export interface IFilterParams {
  category: number;
  brand: string;
  price: string;
  stock: string;
}

export enum CatalogParams {
  View = 'view',
}

export enum ViewParams {
  Default = 'full',
  Full = 'full',
  Short = 'short',
}
// export type ViewParams = {
//   view: 'full' | 'short';
// };

// export interface ISortParams {
//   id: 'short' | 'full';
// }
