import React from 'react'
import Paragraph1 from '../../../ui/paragraph/Paragraph1'
import { Actionbutton } from '../../../ui/button/Actionbutton'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const FormHeader = () => {
    const hostUrl = window.location.origin;
    const navigate = useNavigate();
    const slug = useSelector(state => state?.form?.slug)
    const handleClick = () => {
        navigate("/admin/create/form")
    }
    return (
        <div className='flex flex-col gap-y-5 lg:gap-y-0 lg:flex-row items-center justify-between'>
            <div className='w-full lg:w-[50%]'>
                <Paragraph1 text={`Form name: ${slug?.value}`} />
                <Paragraph1 text={`Form Link: ${hostUrl}/user/form/${slug?.slug}`} />
            </div>
            <div className='flex w-full lg:w-[50%]  items-center justify-end gap-x-8'>
                <Actionbutton onClick={handleClick} type="button" text="Add new" />
                <Actionbutton type="submit" text="Save" />
            </div>
        </div>
    )
}

export default FormHeader
