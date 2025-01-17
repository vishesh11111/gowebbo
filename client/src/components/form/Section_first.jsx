import React, { useCallback } from 'react'
import AddButton from '../../ui/button/AddButton'
import Heading1 from '../../ui/heading/Heading1'
import { allActionButton } from './data'
import FormField from './subsection/FormField'
import { LogoutButton } from '../../ui/button/Actionbutton'
import { useDispatch } from 'react-redux';
import { addBox } from "../redux/slices/formSlice"


const Section_first = () => {
  const dispatch = useDispatch();

  const handleCreateBox = useCallback((data) => {
    let final_data = { id: Math.floor(Math.random() * 10000) + 6710200 * Math.floor(Math.random() * 1900) + 200000, ...data };
    dispatch(addBox(final_data))
  }, [])

  return (
    <div className='w-full h-full flex flex-col justify-between  py-14  px-3 sm:px-10'>
      <div>
        <div className='flex flex-col gap-y-10 mb-7'>
          <div className='flex justify-between items-center'>
            <Heading1 title="Add Input Fields" />
            <div className='flex md:hidden'>
              <LogoutButton />
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 md:grid-cols-1'>
            {
              allActionButton?.map((item) => (
                <AddButton type="button" onClick={() => handleCreateBox(item?.data)} key={item?.id} text={item?.name} />
              ))
            }
          </div>
        </div>
        <div className='bg-[#fff] px-7 md:pb-16 py-5 rounded-xl lg:mt-20'>
          <FormField />
        </div>
      </div>
      <div className='md:flex hidden'>
        <LogoutButton />
      </div>
    </div>
  )
}

export default Section_first
