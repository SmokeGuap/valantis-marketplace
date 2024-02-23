import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useDebounce } from 'src/hooks';

import styles from './PriceInput.module.scss';

const PriceInput = () => {
  const [price, setPrice] = useState<string>('');

  const debouncedPrice = useDebounce(price, 500);

  const [_, setSearchParams] = useSearchParams();

  const { search: searchURI } = useLocation();
  const searchArray = searchURI.split('&');
  const brand = searchArray
    .find((item) => item.includes('brand'))
    ?.split('=')[1];

  const search = searchArray
    .find((item) => item.includes('search'))
    ?.split('=')[1];

  useEffect(() => {
    if (debouncedPrice) {
      setSearchParams(
        brand && search
          ? {
              ['page']: '1',
              ['brand']: brand,
              ['search']: search,
              ['price']: debouncedPrice,
            }
          : brand
          ? {
              ['page']: '1',
              ['brand']: brand,
              ['price']: debouncedPrice,
            }
          : search
          ? {
              ['page']: '1',
              ['search']: search,
              ['price']: debouncedPrice,
            }
          : {
              ['page']: '1',
              ['price']: debouncedPrice,
            }
      );
    } else {
      setSearchParams(
        brand && search
          ? {
              ['page']: '1',
              ['brand']: brand,
              ['search']: search,
            }
          : brand
          ? {
              ['page']: '1',
              ['brand']: brand,
            }
          : search
          ? {
              ['page']: '1',
              ['search']: search,
            }
          : {
              ['page']: '1',
            }
      );
    }
  }, [debouncedPrice]);

  return (
    <input
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      type='number'
      className={styles.input}
      placeholder='цена...'
    ></input>
  );
};

export default PriceInput;
