import React from 'react'

function CardsItem(props) {
    const { label, total } = props;
    return (
        <div>
            <h5 className='text-lg font-semibold'>
                {total}
            </h5>
            <small>
                {label}
            </small>
        </div>
    )
}

export default CardsItem