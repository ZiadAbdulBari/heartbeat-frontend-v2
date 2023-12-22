"use client";
import Doctor from "@/components/Profile/Doctor";
import Patient from "@/components/Profile/Patient";
import MainLayout from "@/layout/MainLayout";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const role = useSelector((state: any) => state.auth.role);
  return (
    <div>
      {role == "patient" && <Patient />}
      {role == "doctor" && <Doctor />}
    </div>
  );
};

export default Profile;
