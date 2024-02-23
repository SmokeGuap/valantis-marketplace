export type TProduct = {
  brand: string;
  id: string;
  price: number;
  product: string;
};

export interface IProductProps {
  product: TProduct;
}