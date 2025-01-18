import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Actionbutton } from '../../../ui/button/Actionbutton';
import { InputUiForm } from '../../../ui/inputs/Input';
import Paragraph1 from '../../../ui/paragraph/Paragraph1';
import { useParams } from 'react-router-dom';
import api_wrapper from '../../apis/Api_wrapper';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../redux/slices/formSlice';
import { toast, ToastContainer } from 'react-toastify';
import ThankYouScreen from "../../../components/thankYouScreen/ThankYouScreen"
import Heading1 from '../../../ui/heading/Heading1';

const UserForm = ({ fields }) => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [selectedStoreAs, setSelectedStoreAs] = useState({});
    const [thankyouShow, setThankyouShow] = useState(false);
    const { slug } = useParams();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        let modifiedData = {};
        dispatch(SetLoading(true));
        Object.entries(data).forEach(([key, value]) => {
            if (typeof value !== "boolean") {
                modifiedData[key] = value;
            }
        });
        Object.entries(selectedStoreAs).forEach(([storeAs, fieldName]) => {
            modifiedData[storeAs] = fieldName;
        });
        try {
            const result = await api_wrapper.post(`/form_submit/create/${slug}`, { data: modifiedData })
            if (result?.data.success) {
                setThankyouShow(true)
                toast.success(result?.data?.message)
                dispatch(SetLoading(false));
            }
        } catch (error) {
            dispatch(SetLoading(false));
            console.log("error->", error);
        }

    };

    const handleCheckboxChange = (fieldName, storeAs) => {
        if (selectedStoreAs[storeAs] === fieldName) return;

        setSelectedStoreAs(prev => ({ ...prev, [storeAs]: fieldName }));

        fields.forEach(field => {
            if (field.html_type === 'button' && field.store_as === storeAs) {
                setValue(field.name, field.name === fieldName);
            }
        });
    };

    const renderField = (field, index) => {
        switch (field.html_type) {
            case 'input':
            case 'date':
                return (
                    <div key={index} className="flex flex-col">
                        {field.label && <label className="text-[1.6rem] md:text-[2rem] mb-1">{field.label}</label>}
                        <Controller
                            name={field.name}
                            control={control}
                            rules={{
                                required: `${field.value} is required`,
                                ...(field.type !== 'date' && field.character_limit
                                    ? { maxLength: { value: parseInt(field.character_limit), message: `Max ${field.character_limit} characters` } }
                                    : {}),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <InputUiForm
                                        onChange={onChange}
                                        value={value || ''}
                                        type={field.type} // Use field.html_type to properly handle date inputs
                                        placeholder={field?.value}
                                    />
                                    {errors[field.name] && (
                                        <p className="text-red-500 text-[1.4rem] md:text-[1.8rem]">{errors[field.name].message}</p>
                                    )}
                                </>
                            )}
                        />
                    </div>
                );
            case 'label':
                return (
                    <div key={index} className="col-span-2 mb-2">
                        <Paragraph1
                            className="text-[1.8rem] md:text-[2rem] cursor-pointer"
                            text={field.value || 'Enter Label Name'}
                        />
                    </div>
                );
            case 'button':
                return (
                    <div key={index}>
                        <Controller
                            name={field.name}
                            control={control}
                            defaultValue={false}
                            render={({ field: { value } }) => (
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        checked={selectedStoreAs[field.store_as] === field.name}
                                        onChange={() => handleCheckboxChange(field.name, field.store_as)}
                                        className="form-checkbox md:h-9 md:w-9 text-blue-600"
                                        disabled={selectedStoreAs[field.store_as] && selectedStoreAs[field.store_as] !== field.name}
                                    />
                                    <span className={`text-[1.6rem] md:text-[2rem] ${selectedStoreAs[field.store_as] === field.name ? 'text-blue-600' : 'text-black'}`}>
                                        {field.value || 'Button'}
                                    </span>
                                </label>
                            )}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    const groupedFields = fields.reduce((acc, field) => {
        const lastGroup = acc[acc.length - 1];
        if (!lastGroup || lastGroup[0].html_type !== field.html_type) {
            acc.push([field]);
        } else {
            lastGroup.push(field);
        }
        return acc;
    }, []);

    return (
        <div>
            {!thankyouShow ?
                <div className='max-w-[90rem] px-4 md:px-16 py-10 rounded-xl  bg-primary m-auto'>
                    <Heading1 title={"Please fill form one"} />
                    <div className="w-full mt-12">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {groupedFields.map((group, groupIndex) => (
                                <div key={groupIndex} className="space-y-4">
                                    {group[0].html_type === 'input' ? (
                                        <div className="grid grid-cols-1 gap-4 md:gap-x-10 sm:grid-cols-2">
                                            {group.map(renderField)}
                                        </div>
                                    ) : group[0].html_type === 'button' ? (
                                        <div className="flex flex-wrap gap-4">
                                            {group.map(renderField)}
                                        </div>
                                    ) : (
                                        group.map(renderField)
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <Actionbutton
                                    type="submit"
                                    className="text-[1.6rem] mt-32 md:text-[2rem] border px-9 rounded-lg md:px-16 py-4 bg-white text-black"
                                    text="Submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                :
                <ThankYouScreen />
            }
            <ToastContainer />
        </div>
    );
};

export default UserForm;
