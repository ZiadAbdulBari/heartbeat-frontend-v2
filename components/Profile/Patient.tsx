import React from "react";
import TableBody from "../ui/Table/TableBody";
import Tr from "../ui/Table/Tr";
import Td from "../ui/Table/Td";

const Patient = () => {
  return (
    <div className="min-h-[88vh] bg-gray-50">
      <div className="container mx-auto h-full">
        <div className="w-full">
          <div className="w-[80%] mx-auto bg-white p-[30px] rounded-[12px]">
            <div className="float-right mb-4 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <path
                  d="M16.7574 2.99666L14.7574 4.99666H5V18.9967H19V9.2393L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"
                  className="fill-blue"
                ></path>
              </svg>
            </div>
            <TableBody tableHeader={[]}>
              <Tr extrsRowCss="bg-gray-100 border-b">
                <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                  Name
                </Td>
                <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                  Ziad Abdul Bari
                </Td>
              </Tr>
              <Tr extrsRowCss="bg-gray-50 border-b">
                <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                  Phone
                </Td>
                <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                  +880 1915820527
                </Td>
              </Tr>
              <Tr extrsRowCss="bg-gray-100 border-b">
                <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                  Email
                </Td>
                <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                  ziadabdulbari01@gmail.com
                </Td>
              </Tr>
            </TableBody>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
