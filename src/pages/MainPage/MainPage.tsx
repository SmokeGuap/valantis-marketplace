import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { getProducts } from 'src/API/requests';
import {
  Brands,
  Pagination,
  PriceInput,
  Products,
  SearchInput,
} from 'src/components';

import styles from './MainPage.module.scss';

const MainPage: FC = () => {
  const [allIds, setAllIds] = useState<string[]>();
  const [ids, setIds] = useState<string[]>();

  const [_, setSearchParams] = useSearchParams();

  const { search: searchURI } = useLocation();
  const searchArray = searchURI.split('&');
  const page = searchArray.find((item) => item.includes('page'))?.split('=')[1];
  const brand = searchArray
    .find((item) => item.includes('brand'))
    ?.split('=')[1];
  const price = searchArray
    .find((item) => item.includes('price'))
    ?.split('=')[1];
  const search = searchArray
    .find((item) => item.includes('search'))
    ?.split('=')[1];

  const [currentPage, setCurrentPage] = useState<number>(page ? +page : 1);

  useEffect(() => {
    if (brand) {
      getProducts('filter', {
        brand: decodeURIComponent(brand).replaceAll('+', ' '),
      }).then((data) => setIds(data));
    } else if (price) {
      getProducts('filter', { price: +price }).then((data) => setIds(data));
    } else if (search) {
      getProducts('filter', { product: decodeURIComponent(search) }).then(
        (data) => setIds(data)
      );
    } else {
      if (allIds && allIds?.length > 0) {
        setIds(allIds);
      } else {
        getProducts('get_ids').then((data) => {
          setIds(data);
          setAllIds(data);
        });
      }
    }
  }, [brand, price, search]);

  useEffect(() => {
    setSearchParams({ ['page']: String(currentPage) });
    document.querySelector('html')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (!ids || !page) return;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Valantis</h1>
      <Brands />
      <div className={styles.inputsWrapper}>
        <PriceInput />
        <SearchInput />
      </div>
      {ids.length === 0 ? (
        <p>Украшений не найдено</p>
      ) : (
        <Products page={+page} ids={ids} />
      )}
      <Pagination
        totalCount={ids.length}
        currentPage={currentPage === +page ? currentPage : 1}
        pageSize={50}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default MainPage;
