import React from 'react';
import { useSelector } from 'react-redux';

const List = () => {
  const { submittedData } = useSelector(state => state?.form);
  if (!Array.isArray(submittedData) || submittedData.length === 0) {
    return <div className="bg-white shadow-md rounded-lg p-4 m-4">No data available</div>;
  }

  return (
    <div className="w-full">
      {submittedData.map((item, index) => (
        <div key={index} className="mb-7 py-4 md:py-6 px-5 md:px-6 rounded-xl bg-white text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem]">
          {"{ "}
          {Object.entries(item).map(([key, value]) => (
            <span key={key} className="mr-2">
              <span className="font-semibold">{key}:</span> {value}, {" "}
            </span>
          ))}
          {"}"}
        </div>
      ))}
    </div>
  );
};

export default List;