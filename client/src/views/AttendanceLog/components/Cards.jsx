import React from 'react';
import { FaInfoCircle } from "react-icons/fa";
import CardsItem from './CardsItem'

function Cards(props) {
  const { labelCard, dataCardItem } = props;

  return (
    <div className='block rounded-lg text-left card-attendance'>
        <div className='head-cards card-item-custom'>
          <div className='font-bold'>
            <p>{labelCard}</p>
          </div>
          <div className='iconInfoCustom'>
            <FaInfoCircle />
          </div>
        </div>
        <div className='content-cards'>
          <div className="card-item-custom">
            {dataCardItem?.map((item, key) => {
              return (
                <CardsItem
                  key={key}
                  label={item.label}
                  total={item.total}
                ></CardsItem>
              );
            })}
          </div>
        </div>
    </div>
  )
}

export default Cards