import React from "react";
interface BodyProps {
  tableHeader: Array<string|number>;
  children: React.ReactNode;
}
const TableBody = ({ tableHeader, children }: BodyProps) => {
  return (
    <table className="table-auto w-full border-collapse border border-slate-200 px-[5px]">
      <thead className="bg-gray-100 py-[5px]">
        <tr>
          {tableHeader.length > 0
            ? tableHeader.map((th, index) => <th className="text-left" key={index}>{th}</th>)
            : ""}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default TableBody;
