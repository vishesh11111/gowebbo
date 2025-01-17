
import React from 'react'

const Paragraph1 = (props) => {
  return (
      <p className='text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem]' {...props}>{props?.text}</p>
  )
}

export default Paragraph1
