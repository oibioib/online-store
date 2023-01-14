export type FilterValue = {
  id: number;
  title: string;
};

export enum FilterStringParams {
  Brand = 'brand',
  Cat = 'category',  // TODO: не делайте сокращений (Cat) в названиях переменных и свойств без крайней на то необходимости. Снижает читабельность кода в последствии
}
export enum FilterNumberParams {
  Price = 'price',
  Stock = 'stock',
}

export type FilterCheckbox = {
  id: number;
  title: string;
  isCheked: boolean;  // TODO: typo в isChecked, не забывайте настраивать спелчекер в редакторе.
  products: number;
  productsFiltered: number;
};

export const searchFields = [
  'title',
  'description',
  'price',
  'brand',
  'rating',
  'stock',
  'discountPercentage',
  'category',
];

export const filterDelimiter = '_';
