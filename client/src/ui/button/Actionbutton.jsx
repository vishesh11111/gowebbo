import React from 'react'
import { LogoutSvg } from '../svg/SvgList'

export const Actionbutton = (props) => {
    return (
        <button className='bg-primary px-10 py-2 hover:bg-gray-300 text-[1.6rem] md:text-[2rem] lg:text-[3rem] rounded-xl' {...props}>{props?.text}</button>
    )
}

export const LogoutButton = () => {
    return <button className='text-[1.8rem] md:text-[2.3rem] lg:text-[3.2rem] flex items-center bg-buttonPrimary px-10 py-2 rounded-xl'>
        <LogoutSvg />
        <p>Logout</p>
    </button>
}
