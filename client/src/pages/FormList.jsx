import React, { useCallback, useMemo, useState } from 'react'
import api_wrapper from '../components/apis/Api_wrapper'
import TableUi from '../ui/table/Table'
import { FormListHeader } from "./formlistHeader"
import Heading1 from '../ui/heading/Heading1'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../components/redux/slices/formSlice'

const FormList = () => {
  const [data, setData] = useState([])
  const dispatch = useDispatch();
  const getList = useCallback(async () => {
    try {
      dispatch(SetLoading(true))
      const result = await api_wrapper.get("/form/find")
      setData(result?.data?.data);
      dispatch(SetLoading(false))
    } catch (error) {
      dispatch(SetLoading(false))
      console.log("Error: ", error);
    }
  }, [dispatch])

  useMemo(() => {
    getList();
  }, [getList])

  return (
    <div className='flex flex-col gap-y-10 m-auto max-w-[70rem]'>
      <Heading1 title={"Form List"} />
      <TableUi tableData={data} headerData={FormListHeader} />
    </div>
  )
}

export default FormList
