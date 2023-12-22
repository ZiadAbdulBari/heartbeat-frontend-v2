
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getLoggedinStatus } from "@/store/authSlice";
// import { useRouter } from "next/navigation";
import TableBody from "../ui/Table/TableBody";
import Tr from "../ui/Table/Tr";
import Td from "../ui/Table/Td";
// import { patientList } from "@/services/service";

const PatientHistory = ({content}:any) => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const token = useSelector((state: any) => state.auth.token);
  // const [content, setContent] = useState([]);
  // const getAppointmentList = () => {
  //   patientList(token).then((response: any) => {
  //     if (response.status == 200) {
  //       setContent(response?.list);
  //       // console.log(response);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   dispatch(getLoggedinStatus());
  //   getAppointmentList();
  // }, [router]);
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
