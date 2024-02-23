import classnames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getProducts } from 'src/API/requests';
import { useHorizontalScroll, useScrollBlock } from 'src/hooks';

import styles from './Brands.module.scss';

const Brands: FC = () => {
  const [brands, setBrands] = useState<string[]>();

  const [_, setSearchParams] = useSearchParams();

  const scrollRef = useHorizontalScroll();
  const [blockScroll, allowScroll] = useScrollBlock();

  const { search: searchURI } = useLocation();
  const searchArray = searchURI.split('&');
  const brand = searchArray
    .find((item) => item.includes('brand'))
    ?.split('=')[1];
  const price = searchArray
    .find((item) => item.includes('price'))
    ?.split('=')[1];
  const search = searchArray
    .find((item) => item.includes('search'))
    ?.split('=')[1];
  const [activeBrand, setActiveBrand] = useState(brand ? brand : '');

  useEffect(() => {
    getProducts('get_fields', { field: 'brand' }).then((data) =>
      setBrands(data)
    );
  }, []);

  useEffect(() => {
    if (activeBrand) {
      setSearchParams(
        search && price
          ? {
              ['page']: '1',
              ['search']: search,
              ['price']: price,
              ['brand']: activeBrand,
            }
          : search
          ? {
              ['page']: '1',
              ['search']: search,
              ['brand']: activeBrand,
            }
          : price
          ? {
              ['page']: '1',
              ['price']: price,
              ['brand']: activeBrand,
            }
          : {
              ['page']: '1',
              ['brand']: activeBrand,
            }
      );
    } else {
      setSearchParams(
        search && price
          ? {
              ['page']: '1',
              ['search']: search,
              ['price']: price,
            }
          : search
          ? {
              ['page']: '1',
              ['search']: search,
            }
          : price
          ? {
              ['page']: '1',
              ['price']: price,
            }
          : {
              ['page']: '1',
            }
      );
    }
  }, [activeBrand]);

  if (!brands) return;

  return (
    <div
      onMouseEnter={blockScroll}
      onMouseLeave={allowScroll}
      ref={scrollRef}
      className={styles.categories}
    >
      <button
        type='button'
        onClick={() => setActiveBrand('')}
        className={classnames(styles.category, {
          [styles.activeCategory]: activeBrand === '',
        })}
      >
        all
      </button>
      {brands.map((brand, id) => (
        <button
          type='button'
          key={id}
          onClick={() => setActiveBrand(activeBrand === brand ? '' : brand)}
          className={classnames(styles.category, {
            [styles.activeCategory]: activeBrand === brand,
          })}
        >
          {brand}
        </button>
      ))}
    </div>
  );
};

export default Brands;
