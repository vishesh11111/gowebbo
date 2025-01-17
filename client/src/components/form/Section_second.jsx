import React from 'react'
import { useSelector } from 'react-redux';
import InputUi, { InputUiForm } from '../../ui/inputs/Input';
import FormHeader from './subsection/FormHeader';
import Paragraph1 from '../../ui/paragraph/Paragraph1';
import { Actionbutton } from '../../ui/button/Actionbutton';
import FormLayout from './subsection/FormLayout'
import List from "./list/List"

const Section_second = () => {
  const formEntries = useSelector(state => state?.form?.entries);
  const selectedBox = useSelector(state => state?.form?.selectedBox);


  // useEffect(() => {
  // }, [formEntries])

  return (
    <div className='px-8 w-full py-5'>
      <FormHeader />
      <div className='bg-primary p-6 md:px-16 py-6 my-10 border pb-20 rounded-2xl'>
        <FormLayout fields={formEntries} />
      </div>
      <div className='bg-primary p-6 md:px-16 py-6 my-10 border  rounded-2xl'>
        <List fields={formEntries} />
      </div>
    </div>
  )
}

export default Section_second
