import { TProduct } from '../Product/Product.types';

export type TProducts = TProduct[];

export interface IProductsProps {
  page: number;
  ids: string[];
}
