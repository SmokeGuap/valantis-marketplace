import { Dispatch, SetStateAction } from 'react';

export interface IPaginationProps {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  sibling?: number;
}
