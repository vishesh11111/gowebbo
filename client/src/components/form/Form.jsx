import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Section_first from './Section_first';
import Section_second from './Section_second';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading, updateEntries } from '../redux/slices/formSlice';
import { ToastContainer, toast } from 'react-toastify';
import api_wrapper from "../../components/apis/Api_wrapper"
import Loader from "../../ui/loading/Loader"
import UserForm from './formSubmit/UserForm';

const Form = () => {
    const [formInput, setFormInput] = useState([])
    const { register, formState: { errors } } = useForm();
    const entries = useSelector(state => state?.form?.entries);
    const slug = useSelector(state => state?.form?.slug);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valueCheck = validateEntries(entries);
        if (entries.length == 0) {
            return;
        }
        if (!valueCheck?.status) {
            // dispatch(updateEntries(valueCheck?.updateArray))
            toast.warning("All box should have value")
            return
        }
        if (!slug?.value) {
            toast.warning("Please create form name by regex box")
            return
        }
        dispatch(SetLoading(true));
        const serverData = {
            title: slug?.value,
            link: slug?.slug,
            data: entries
        }
        try {
            const result = await api_wrapper.post("/form/create", serverData)
            if (result?.data?.success) {
                toast.success(result?.data?.message)
                dispatch(SetLoading(false));
            }
        } catch (error) {
            dispatch(SetLoading(false));
            console.log(error);
        }

        console.log("yel", serverData)
        // setFormInput([...formInput, data])
        // console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col md:h-[1024px] md:flex-row gap-x-10 border border-red-500'>
                <div className='border w-full md:w-[34%] bg-gray-300 h-full'>
                    <Section_first />
                </div>
                <div className='border w-full md:w-[65%] bg-[#fff]'>
                    <Section_second />
                </div>
            </form>
            <UserForm fields={entries}/>
            <ToastContainer />
            {/* <Loader/> */}
        </div>
    )
}

export default Form


const validateEntries = (entries) => {
    const status = {
        status: true,
        updateArray: entries
    }
    const updatedArray = entries?.map((item) => {
        if (!item?.value) {
            status.status = false
            return { ...item, error: true }
        } else {
            return { ...item, error: false }
        }
    })
    status.updateArray = updatedArray
    return status;
};