import React from 'react'
import Paragraph1 from '../../../ui/paragraph/Paragraph1'
import { Actionbutton } from '../../../ui/button/Actionbutton'
import { useSelector } from 'react-redux'

const FormHeader = () => {
    const slug = useSelector(state => state?.form?.slug)

    return (
        <div className='flex items-center justify-between'>
            <div className='w-[15rem] sm:w-auto'>
                <Paragraph1 text={`Form name: ${slug?.value}`} />
                <Paragraph1 text={`Form Link: ${slug?.slug}`} />
            </div>
            <div className='flex items-center gap-x-8'>
                <Actionbutton type="button" text="Add new" />
                <Actionbutton type="submit" text="Save" />
            </div>
        </div>
    )
}

export default FormHeader
