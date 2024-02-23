import { FC, useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getProducts } from 'src/API/requests';
import { Product } from 'src/components';

import styles from './Products.module.scss';
import { IProductsProps, TProducts } from './Products.types';

const Products: FC<IProductsProps> = (props) => {
  const { page, ids } = props;

  const [products, setProducts] = useState<TProducts>();

  const { status, isFetching, data, refetch } = useQuery({
    queryKey: ['get_items', page],
    queryFn: () =>
      getProducts('get_items', {
        ids: [...ids.slice((+page - 1) * 50, +page * 50)],
      }),
    retry: 3,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    refetch();
  }, [ids.length]);

  useEffect(() => {
    if (status === 'success') {
      setProducts(data);
    }
  }, [status, data]);

  if (isFetching) return <p>Загрузка...</p>;

  if (!products) return <p>Украшения не найдены</p>;

  return (
    <div className={styles.products}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
