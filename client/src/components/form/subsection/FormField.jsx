import React from 'react';
import { formFieldData } from '../data';
import InputUi from '../../../ui/inputs/Input';
import { useDispatch, useSelector } from 'react-redux';
import { handleSelectBox, slugCreate, updateEntries } from '../../redux/slices/formSlice';

const FormField = () => {
    const dispatch = useDispatch();
    const entries = useSelector(state => state?.form?.entries);
    const selectedBox = useSelector(state => state?.form?.selectedBox);
    const slug = useSelector(state => state?.form?.slug);

    const handleStoreData = (name, value) => {
        let cloneSelected = {...selectedBox};
        if (name === "regex") {
            dispatch(slugCreate({
                slug: String(value)?.trim()?.split(" ")?.join("-") + Math.floor(Math.random() * 19200000),
                value: value
            }));
            return;
        }

        const findIndex = entries?.findIndex(item => item?.id === selectedBox?.id);
        if (findIndex === -1) return; // Early return if the entry is not found

        // Create a new entry object with the updated value
        const updatedEntry = {
            ...entries[findIndex],
            [name]: value // Update the specific field
        };

        const cloneEntries = [...entries];
        cloneEntries[findIndex] = updatedEntry;
        cloneSelected[name] = value;
        dispatch(handleSelectBox(cloneSelected))
        dispatch(updateEntries(cloneEntries));
    };


    return (
        <div className='flex flex-col gap-y-5'>
            {
                formFieldData?.map((item, index) => (
                    <InputUi
                        value={index === 0 ? slug?.value : selectedBox[item?.name]}
                        onChange={(e) => handleStoreData(item?.name, e?.target?.value)}
                        key={index}
                        type={item?.type}
                        required={item?.required}
                        title={item?.title}
                        keyName={item?.name}
                        disabled={((selectedBox?.html_type !== "input" && index === 3) ||
                            (selectedBox?.html_type !== "input" && index === 0)) ||
                            item?.disabled}
                    />
                ))
            }
        </div>
    );
};

export default FormField;
