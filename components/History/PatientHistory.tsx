import React from "react";
import TableBody from "../ui/Table/TableBody";
import Tr from "../ui/Table/Tr";
import Td from "../ui/Table/Td";

const PatientHistory = ({ content }: any) => {
  return (
    <div>
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
        {content.length > 0 ? (
          content.map((data: any, index: number) => (
            <Tr key={index} extrsRowCss="">
              <Td extrsColCss="">{data.patient_name}</Td>
              <Td extrsColCss="">{data.age}</Td>
              <Td extrsColCss="">{data.contact}</Td>
              <Td extrsColCss="">{data.disease}</Td>
              <Td extrsColCss="">{data.doctor_name}</Td>
              <Td extrsColCss="">{data.chosen_date}</Td>
              <Td extrsColCss="">{data.status}</Td>
            </Tr>
          ))
        ) : (
          <p>No record</p>
        )}
      </TableBody>
    </div>
  );
};

export default PatientHistory;
