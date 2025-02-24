import React from 'react'
import { useSelector } from 'react-redux';
import FormHeader from './subsection/FormHeader';
import Paragraph1 from '../../ui/paragraph/Paragraph1';
import FormLayout from './subsection/FormLayout'
import List from "./list/List"
import Heading1 from '../../ui/heading/Heading1';

const SectionSecond = () => {
  const formEntries = useSelector(state => state?.form?.entries);
  // useEffect(() => {
  // }, [formEntries])

  return (
    <div className='px-8 w-full py-5'>
      <FormHeader />
      <div className='bg-primary p-6 max-h-[47rem] overflow-y-auto md:px-16 py-6 my-10  pb-20 rounded-2xl'>
        <Paragraph1 text={"Note: Click 3 time on the same box which you want remove "} />
        <FormLayout fields={formEntries} />
      </div>
      <div className='bg-primary max-h-[41rem] flex flex-col gap-y-8 px-4 md:px-8 py-5 my-10 rounded-2xl'>
        <Heading1 title="Responses" />
        <div className="overflow-y-auto max-h-[38rem]">
          <List />
        </div>
      </div>
    </div>
  )
}

export default SectionSecond
