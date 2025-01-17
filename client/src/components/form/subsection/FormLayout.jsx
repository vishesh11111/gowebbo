import React, { useState } from 'react';
import { InputUiForm } from '../../../ui/inputs/Input';
import { Actionbutton } from '../../../ui/button/Actionbutton';
import Paragraph1 from '../../../ui/paragraph/Paragraph1';
import { useDispatch, useSelector } from 'react-redux';
import { handleSelectBox, updateEntries } from '../../redux/slices/formSlice';

const FormLayout = ({ fields }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const dispatch = useDispatch();
  const { selectedBox, entries } = useSelector(state => state.form);
  const [count, setCount] = useState(0);


  const handleSelect = (selected) => {
    setCount(count + 1);
    if ((selectedBox?.id === selected?.id && count > 1)) {
      setCount(0);
      const filteredEntries = entries.filter(entry => entry.id !== selected.id);
      dispatch(updateEntries(filteredEntries));
      dispatch(handleSelectBox({}));
      setSelectedValue(null);
    } else {
      setSelectedValue(selected.id);
      dispatch(handleSelectBox(selected));
    }
  };

  const handleChange = (field, value) => {
    const updatedEntries = entries.map(entry =>
      entry.id === field.id ? { ...entry, value, name: value.trim().replace(/\s+/g, '_').toLowerCase() } : entry
    );
    dispatch(updateEntries(updatedEntries));
  };

  const renderField = (field, index) => {
    const isSelected = selectedValue === field.id;
    const commonClass = isSelected ? "border-[1.5px] border-black rounded-xl w-full p-2" : "";

    switch (field.html_type) {
      case 'input':
        return (
          <div key={index} onClick={() => handleSelect(field)} className={`flex flex-col ${commonClass}`}>
            <InputUiForm
              onChange={(e) => handleChange(field, e.target.value)}
              value={field.value || ''}
              type={field.type === 'date' ? 'text' : field.type}
            />
          </div>
        );
      case 'label':
        return (
          <div key={index} onClick={() => handleSelect(field)} className="col-span-2 mb-2">
            {isSelected ? (
              <InputUiForm
                focus={isSelected}
                onChange={(e) => handleChange(field, e.target.value)}
                value={field.value || ''}
                type="text"
              />
            ) : (
              <Paragraph1
                className="text-[1.8rem] md:text-[2rem] cursor-pointer"
                text={field.value || 'Enter Label Name'}
              />
            )}
          </div>
        );
      case 'button':
        return (
          <div key={index} onClick={() => handleSelect(field)} className={commonClass}>
            {isSelected ? (
              <InputUiForm
                focus={isSelected}
                onChange={(e) => handleChange(field, e.target.value)}
                value={field.value || ''}
                type="text"
              />
            ) : (
              <Actionbutton
                type="button"
                className={`text-[1.6rem] md:text-[2rem] px-8 rounded-lg md:px-10 py-4 ${isSelected ? 'bg-buttonPrimary text-white' : 'bg-white text-black border'}`}
                text={field.value || 'Button'}
              />
            )}
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
      <form className="space-y-6">
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
      </form>
    </div>
  );
};

export default FormLayout;
