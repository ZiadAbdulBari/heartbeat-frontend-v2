
import React, { useEffect, useState } from "react";
import TableBody from "../ui/Table/TableBody";
import Tr from "../ui/Table/Tr";
import Td from "../ui/Table/Td";
// import { useDispatch, useSelector } from "react-redux";
// import { getLoggedinStatus } from "@/store/authSlice";
// import { useRouter } from "next/navigation";
// import { appointmentList } from "@/services/service";
const DoctorHistory = ({ content }: any) => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const token = useSelector((state: any) => state.auth.token);
  // const [tabTitle, setTabTitle] = useState([
  //   "Current record",
  //   "Previous record",
  // ]);
  // const [content, setContent] = useState([]);
  // const date = new Date();
  // const day = date.toLocaleDateString();
  // const getAppointmentList = () => {
  //   appointmentList(day, token).then((response: any) => {
  //     console.log(response);
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

export default DoctorHistory;
