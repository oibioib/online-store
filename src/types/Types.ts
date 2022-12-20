// TODO
export enum ApiSettings {
  Url = 'https://dummyjson.com/',
  ProductsLimit = 100,
}

export enum ApiEndpoints {
  Products = 'products',
}

export enum ProductDetailsLabels {
  Description = 'Description',
  DiscountPercentage = 'Discount',
  Rating = 'Rating',
  Stock = 'Stock',
  Brand = 'Brand',
  Category = 'Category',
  Currency = '€',
}

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  images: string[];
  rating: number;
  stock: number;
  thumbnail: string;
  discountPercentage: number;
  category: string;
};
