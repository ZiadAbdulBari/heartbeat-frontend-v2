import React from "react";
import TableBody from "../ui/Table/TableBody";
import Tr from "../ui/Table/Tr";
import Td from "../ui/Table/Td";
const PatientSerial = ({ content }: any) => {
  return (
    <div>
      {content.length > 0 ? (
        <TableBody
          tableHeader={[
            "Patient name",
            "Age",
            "Contact",
            "Disease",
            "Doctor name",
            "Checkup date",
            "Status",
          ]}
        >
          {content.map((data: any, index: number) => (
            <Tr
              key={index}
              extrsRowCss={`${
                data.status == "calling" ? "bg-green-500 text-white" : ""
              }`}
            >
              <Td extrsColCss="">{data.patient_name}</Td>
              <Td extrsColCss="">{data.age}</Td>
              <Td extrsColCss="">{data.contact}</Td>
              <Td extrsColCss="">{data.disease}</Td>
              <Td extrsColCss="">{data.doctor_name}</Td>
              <Td extrsColCss="">{data.chosen_date}</Td>
              <Td extrsColCss="">{data.status}</Td>
            </Tr>
          ))}
        </TableBody>
      ) : (
        <p>No record</p>
      )}
    </div>
  );
};

export default PatientSerial;
