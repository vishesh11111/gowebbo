
import React from 'react'

const Paragraph1 = (props) => {
  return (
      <p className='text-[1.4rem] md:text-[1.8rem] lg:text-[2rem]' {...props}>{props?.text}</p>
  )
}

export default Paragraph1
