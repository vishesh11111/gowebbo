import React from "react";
import { Link } from "react-router"

const TableUi = ({ headerData, tableData }) => {
  // Dynamic Header Data
  //   const headerData = [
  //     { id: 1, keyName: "id", title: "Id" },
  //     { id: 2, keyName: "name", title: "name" },
  //     { id: 3, keyName: "responses", title: "responses" },
  //   ];

  //   // Table Body Data
  //   const tableData = [
  //     { id: 1, name: "Form1", responses: "12 responses" },
  //     { id: 2, name: "Form 2", responses: "12 responses" },
  //     { id: 3, name: "Test Form", responses: "12 responses" },
  //   ];

  return (
    <div className="w-full">
      <table className="w-full ">
        {/* Table Header */}
        <thead>
          <tr className="bg-gray-300 px-6">
            {headerData.map((header) => (
              <th key={header.id} className="p-2 py-4 text-[1.8rem] md:text-[2rem] text-left">
                {header.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index} className="bg-gray-200 border-t hover:bg-buttonPrimary cursor-pointer border-white">
              {headerData.map((header) => (
                <td key={header.id} className="p-2 py-3 text-[1.6rem] md:text-[1.8rem]">
                  <Link to={`/admin/update/form/${row?.link}`}>
                    {row[header.keyName]}
                  </Link>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUi;
