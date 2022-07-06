import React from 'react'
import { ICategoryObject } from '../redux/models'
interface ICardItem {
  category: ICategoryObject
}
const CardItem = (props: ICardItem) => {
  const {category} = props; 
  return (
      <div className="src-process--item card-item">
      <p>{category?.name}</p>
      <p>{category?.count}</p>
    </div>
  )
}

export default CardItem
