import React from 'react'
import { Pagination as PaginationTable } from 'antd';
import { IPagination } from 'src/models/common';
import { useAppSelector } from 'src/redux/hooks';
interface IProps {
  pagination : IPagination,
  totalRow: number,
  onChangePage: (page: number) => void
}
const Pagination = (props: IProps) => {
  const {pagination, totalRow, onChangePage} = props;

  const {page, size} = pagination;
  const handleChange = (page: number) => {
    onChangePage && onChangePage(page)
  }
  return (
    <div className="pagination-wrapper">
      <div className="show-current-page-size"> 
      <span>{`Đang xem ${(page*size - size + 1) < totalRow ?  (page*size - size + 1) : totalRow } đến ${page*size < (totalRow as number) ? page*size : totalRow } trong tổng số ${totalRow} mục`}</span>
      </div>
      <PaginationTable pageSize={size} onChange={handleChange}  current={page} total={totalRow ? totalRow : 1 }  />
    </div>
  )
}

export default Pagination
