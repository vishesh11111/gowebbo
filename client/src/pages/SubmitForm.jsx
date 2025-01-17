// import { useParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'
import UserForm from '../components/form/formSubmit/UserForm'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../components/redux/slices/formSlice';
import api_wrapper from '../components/apis/Api_wrapper';
import { processFormData } from '../components/form/formSubmit/formatedata';

const SubmitForm = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [formDetails, setFormDetails] = useState([]);
    const getDetails = useCallback(async () => {
        try {
            dispatch(SetLoading(true));
            const result = await api_wrapper.get(`/form/findById/${slug}`)
            if (result?.data?.success) {
                setFormDetails(processFormData(result?.data?.data?.data || []))
                dispatch(SetLoading(false));
            } else {
                dispatch(SetLoading(false));
                // toast.error(result?.data?.message)
            }
        } catch (error) {
            console.log(error);
        }
    }, [slug, dispatch])

    useMemo(() => {
        if (slug) {
            getDetails();
        }
    }, [slug, getDetails])
    return (<UserForm fields={formDetails} />)
}

export default SubmitForm
