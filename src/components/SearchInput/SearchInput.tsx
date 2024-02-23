import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { useDebounce } from 'src/hooks';

import styles from './SearchInput.module.scss';

const SearchInput = () => {
  const [search, setSearch] = useState<string>('');

  const debouncedSearch = useDebounce(search, 500);

  const [_, setSearchParams] = useSearchParams();

  const { search: searchURI } = useLocation();
  const searchArray = searchURI.split('&');
  const brand = searchArray
    .find((item) => item.includes('brand'))
    ?.split('=')[1];
  const price = searchArray
    .find((item) => item.includes('price'))
    ?.split('=')[1];

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams(
        brand && price
          ? {
              ['page']: '1',
              ['brand']: brand,
              ['price']: price,
              ['search']: debouncedSearch,
            }
          : brand
          ? {
              ['page']: '1',
              ['brand']: brand,
              ['search']: debouncedSearch,
            }
          : price
          ? {
              ['page']: '1',
              ['price']: price,
              ['search']: debouncedSearch,
            }
          : {
              ['page']: '1',
              ['search']: debouncedSearch,
            }
      );
    } else {
      setSearchParams(
        brand && price
          ? {
              ['page']: '1',
              ['brand']: brand,
              ['price']: price,
            }
          : brand
          ? {
              ['page']: '1',
              ['brand']: brand,
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
  }, [debouncedSearch]);

  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.input}
      placeholder='поиск...'
    ></input>
  );
};

export default SearchInput;
