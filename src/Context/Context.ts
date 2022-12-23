import { createContext } from 'react';
import { Product } from '../types/ProductTypes';

export const productsContext = createContext<Product[]>([]);
