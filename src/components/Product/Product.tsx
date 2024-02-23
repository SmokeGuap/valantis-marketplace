import { FC } from 'react';

import { JewelryIcon } from 'src/assets/icons';
import { formatePrice } from 'src/utils';

import styles from './Product.module.scss';
import { IProductProps } from './Product.types';

const Product: FC<IProductProps> = (props) => {
  const { product } = props;

  return (
    <div key={product.id} className={styles.product}>
      <JewelryIcon />
      <p className={styles.name}>{product.product}</p>
      <p className={styles.brand}>{product.brand}</p>
      <p className={styles.price}>{formatePrice(product.price)}</p>
    </div>
  );
};

export default Product;
