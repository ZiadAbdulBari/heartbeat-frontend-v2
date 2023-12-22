"use client";
import DoctorHistory from "@/components/History/DoctorHistory";
import PatientHistory from "@/components/History/PatientHistory";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { patientHistory } from "@/services/service";
import { doctorHistory } from "@/services/service";
import MainLayout from "@/layout/MainLayout";

const History = () => {
  const role = useSelector((state: any) => state.auth.role);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const isLoggedin = useSelector((state: any) => state.auth.isLoggedin);
  const [content, setContent] = useState([]);
  const getHistory = () => {
    const date = "false";
    if (role == "patient") {
      patientHistory(date, token).then((response: any) => {
        if (response.status == 200) {
          setContent(response?.list);
          // console.log(response);
        }
      });
    } else if (role == "doctor") {
      doctorHistory(date, token).then((response: any) => {
        if (response.status == 200) {
          setContent(response?.list);
          // console.log(response);
        }
      });
    }
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    if (isLoggedin) {
      getHistory();
    }
  }, [router, isLoggedin]);
  return (
    <div className="container mx-auto">
      {role == "patient" && <PatientHistory content={content} />}
      {role == "doctor" && <DoctorHistory content={content} />}
    </div>
  );
};

export default History;
