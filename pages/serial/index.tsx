"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import PatientSerial from "@/components/Serial/PatientSerial";
import DoctorSerial from "@/components/Serial/DoctorSerial";
import { editStateus, patientHistory } from "@/services/service";
import { doctorHistory } from "@/services/service";
const Serial = () => {
  const role = useSelector((state: any) => state.auth.role);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const isLoggedin = useSelector((state: any) => state.auth.isLoggedin);
  const [content, setContent] = useState([]);
  const getSerial = () => {
    const date = new Date();
    const dateSting = date.toLocaleDateString();
    if (role == "patient") {
      patientHistory(dateSting, token).then((response: any) => {
        if (response.status == 200) {
          setContent(response.list);
        }
      });
    } else if (role == "doctor") {
      doctorHistory(dateSting, token).then((response: any) => {
        if (response.status == 200) {
          setContent(response.list);
        }
      });
    }
  };
  const callPatient = (status: string, id: string) => {
    editStateus(status, id, token).then((response: any) => {
      if (response.status == 200) {
        getSerial();
      }
    });
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    if (isLoggedin) {
      getSerial();
    }
  }, [router, isLoggedin]);
  return (
    <div className="container mx-auto">
      {role == "patient" && <PatientSerial content={content} />}
      {role == "doctor" && (
        <DoctorSerial content={content} onClick={callPatient} />
      )}
    </div>
  );
};

export default Serial;
