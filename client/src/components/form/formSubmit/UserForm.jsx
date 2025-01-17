import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Actionbutton } from '../../../ui/button/Actionbutton';
import { InputUiForm } from '../../../ui/inputs/Input';
import Paragraph1 from '../../../ui/paragraph/Paragraph1';

const UserForm = ({ fields }) => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleCheckboxChange = (fieldName) => {
        setSelectedCheckbox(fieldName);
        let anySelected = false;
        fields.forEach(field => {
            if (field.html_type === 'button') {
                const isChecked = field.name === fieldName;
                setValue(field.name, isChecked);
                if (isChecked) anySelected = true;
            }
        });
        setIsButtonDisabled(!anySelected);
    };

    const renderField = (field, index) => {
        const commonClass = "";

        switch (field.html_type) {
            case 'input':
                return (
                    <div key={index} className={`flex flex-col ${commonClass}`}>
                        <label className="text-[1.6rem] md:text-[2rem] mb-1">
                            {field.label || field.value}
                        </label>
                        <Controller
                            name={field.name}
                            control={control}
                            rules={{ 
                                required: `${field.value} is required`,
                                maxLength: field.character_limit ? { value: parseInt(field.character_limit), message: `Max ${field.character_limit} characters` } : undefined,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <InputUiForm
                                        onChange={onChange}
                                        value={value || ''}
                                        type={field?.type}
                                        placeholder={field?.value}
                                        maxLength={field.character_limit || undefined}
                                    />
                                    {errors[field.name] && (
                                        <p className="text-red-500 text-sm">{errors[field.name].message}</p>
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
                    <div key={index} className={commonClass}>
                        <Controller
                            name={field.name}
                            control={control}
                            defaultValue={false}
                            render={({ field: { value } }) => (
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedCheckbox === field.name}
                                        onChange={() => handleCheckboxChange(field.name)}
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span className={`text-[1.6rem] md:text-[2rem] ${selectedCheckbox === field.name ? 'text-blue-600' : 'text-black'}`}>
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
        <div className="w-full mt-10">
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
                        className="text-[1.6rem] md:text-[2rem] px-8 rounded-lg md:px-10 py-4 bg-buttonPrimary text-white"
                        text="Submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default UserForm;
