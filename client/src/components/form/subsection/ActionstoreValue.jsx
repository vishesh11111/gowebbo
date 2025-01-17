import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ActionstoreValue = () => {
    const dispatch = useDispatch();
    const selectedBox = useSelector(state => state?.form?.selectedBox);
    const entries = useSelector(state => state?.form?.entries);

  return (
    <div>
      
    </div>
  )
}

export default ActionstoreValue
