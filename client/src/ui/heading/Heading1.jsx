import React from 'react'

const Heading1 = (props) => {
    return (
        <div
            className='font-semibold w-full font-inter text-[2.5rem] lg:text-[3.6rem] leading-[43.57px]'
        >
            {props.title}
        </div>
    )
}

export default Heading1
