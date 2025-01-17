import React from 'react'
import { AddIcon } from "../svg/SvgList"

const AddButton = (props) => {
    return (
        <button className='min-w-[8rem] m-auto py-3 text-[1.8rem] sm:text-[2.5rem] lg:text-[3.6rem] justify-between rounded-xl w-full flex items-center bg-[#fff] px-7' {...props}>
            <p>{props?.text}</p>
            <AddIcon />
        </button>
    )
}

export default AddButton
