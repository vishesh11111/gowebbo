import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading, SetSubmittedData, slugCreate, updateEntries } from '../redux/slices/formSlice';
import { ToastContainer, toast } from 'react-toastify';
import api_wrapper from "../../components/apis/Api_wrapper"
import { useParams } from 'react-router-dom';
import SectionFirst from './Section_first';
import SectionSecond from './Section_second';

const FormComponent = () => {
    const entries = useSelector(state => state?.form?.entries);
    const slug = useSelector(state => state?.form?.slug);
    const dispatch = useDispatch();
    const { slug: link } = useParams();

    const getDetails = useCallback(async () => {
        try {
            dispatch(SetLoading(true));
            const result = await api_wrapper.get(`/form/findById/${link}`)
            if (result?.data?.success) {
                dispatch(slugCreate({
                    value: result?.data?.data?.title,
                    slug: result?.data?.data?.link
                }))
                dispatch(updateEntries(result?.data?.data?.data || []))
                const finaleData = result.data?.data?.submissions.length > 0 ? result.data?.data?.submissions?.map((item) => item?.data) : []
                dispatch(SetSubmittedData(finaleData));
                // dispatch(SetSubmittedData())
                dispatch(SetLoading(false));
            } else {
                dispatch(SetLoading(false));
                toast.error(result?.data?.message)
            }
        } catch (error) {
            console.log(error);
        }
    }, [link, dispatch])

    useMemo(() => {
        if (link) {
            getDetails();
        } else {
            dispatch(updateEntries([]))
            dispatch(SetSubmittedData([]))
            dispatch(slugCreate({
                slug: "",
                value: ""
            }))
        }
    }, [link, getDetails, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valueCheck = validateEntries(entries);
        if (entries.length === 0) {
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
            let method = {
                method: "post",
                url: "/form/create"
            }
            if (link) {
                method = {
                    method: "patch",
                    url: `/form/update/${link}`
                }
            }
            const result = await api_wrapper[method?.method](method?.url, serverData)
            if (result?.data?.success) {
                toast.success(result?.data?.message)
                dispatch(SetLoading(false));
            }
        } catch (error) {
            dispatch(SetLoading(false));
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col md:h-[1024px] md:flex-row gap-x-10'>
                <div className=' rounded-xl w-full md:w-[34%] bg-gray-300 h-full'>
                    <SectionFirst />
                </div>
                <div className='w-full md:w-[65%] bg-[#fff]'>
                    <SectionSecond />
                </div>
            </form>
            {/* <UserForm fields={entries} /> */}
            <ToastContainer />
            {/* <Loader/> */}
        </div>
    )
}

export default FormComponent


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