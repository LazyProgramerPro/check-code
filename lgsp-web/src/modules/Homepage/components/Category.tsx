import React from 'react';
import { ICategoryObject } from '../redux/models';
import CardItem from './CardItem';

interface ICategory {
  categories?: ICategoryObject[];
}
export const Category = function (props: ICategory) {
  const { categories } = props;
  return (
    <div className="src-process categoty-wrapper">
      <div className="categoty-container">
        <div className="src-process--header header__flex category-title title-header">
          <h1 className="header--blue-text name">NHÓM DỊCH VỤ ĐANG TRIỂN KHAI</h1>
        </div>
        <div className="header__flex">
          <div className="header--line" />
        </div>
        <div className="src-process--list category-list">
          {categories?.map((category: ICategoryObject, index: number) => {
            return <CardItem category={category} key={index} />
          })}
        </div>
      </div>

    </div>

  );
};

export default Category;
