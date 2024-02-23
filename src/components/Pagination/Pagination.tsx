import { FC } from 'react';

import { usePagination } from 'src/hooks';

import styles from './Pagination.module.scss';
import { IPaginationProps } from './Pagination.types';

const Pagination: FC<IPaginationProps> = (props) => {
  const { totalCount, currentPage, pageSize, setCurrentPage } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  if (!paginationRange || currentPage === 0 || paginationRange.length < 2) {
    return;
  }
  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const onPageChange = (number: number) => {
    setCurrentPage(number);
  };

  return (
    <nav className={styles.pagination}>
      <div className={styles.list}>
        {currentPage == 1 ? (
          <button type='button' disabled className={styles.prev}>
            &lt;&lt;
          </button>
        ) : (
          <button
            type='button'
            className={styles.prevActive}
            onClick={onPrevious}
          >
            &lt;&lt;
          </button>
        )}
        {paginationRange.map((pageNumber, id) => {
          if (pageNumber === '...') {
            return (
              <button type='button' key={id} className={styles.dots}>
                &#8230;
              </button>
            );
          }
          if (currentPage == pageNumber) {
            return (
              <button
                type='button'
                key={id}
                className={styles.currentPageNumber}
              >
                {pageNumber}
              </button>
            );
          }
          return (
            <button
              type='button'
              key={id}
              className={styles.pageNumber}
              onClick={() => onPageChange(+pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        {currentPage == Math.ceil(totalCount / pageSize) ? (
          <button type='button' disabled className={styles.next}>
            &gt;&gt;
          </button>
        ) : (
          <button type='button' className={styles.nextActive} onClick={onNext}>
            &gt;&gt;
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
