
import React, { useState } from "react";
import auth from "../../public/img/doctor/auth.jpg";
import Image from "next/image";
import Input from "../ui/Input/Input";
import Link from "next/link";
import { registration } from "@/services/service";
import { useRouter } from "next/navigation";
const Registration = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [account, setAccount] = useState("");
  const handleInputValue = (e: any) => {
    e.preventDefault();
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "confirmPassword") {
      setConfirmPassword(e.target.value);
    }
  };
  const userRegistration = ()=>{
    registration(name,email,password,account)
    .then((res:any)=>{
      // console.log(res);
      if(res.status==200){
        router.push('/signin');

      }
    })
  }
  return (
    <>
      <div className="h-screen w-full relative z-20">
        {account == "" && (
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50">
            <div className=" bg-white py-[50px] px-[70px] rounded-[8px]">
              <p className="font-bold text-[30px] text-gray-700">
                What type of account do you need?
              </p>
              <div className="flex gap-x-4 justify-center mt-12">
                <button
                  onClick={() => setAccount("doctor")}
                  className="bg-red text-white text-[20px] font-semibold px-[30px] py-[15px] rounded-[8px]"
                >
                  As a doctor
                </button>
                <button
                  onClick={() => setAccount("patient")}
                  className="bg-blue text-white text-[20px] font-semibold px-[30px] py-[15px] rounded-[8px]"
                >
                  As a patient
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-4 left-8 z-50">
          <Link href="/">
            <div className="flex items-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
              >
                <path
                  d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"
                  className="fill-red"
                ></path>
              </svg>
              <p className="font-bold text-red text-[15px]">Go to home</p>
            </div>
          </Link>
        </div>
        <div
          className={`flex justify-between w-full h-screen ${
            account == "" && "blur-sm"
          }`}
        >
          <div className="w-[50%] h-screen">
            <Image src={auth} alt="Image" className="h-screen" />
          </div>
          <div className="flex justify-center items-center w-[50%] h-screen bg-blue/[0.1]">
            <div className="bg-red rounded-[12px] px-[30px] py-[40px] w-[50%]">
              <h1 className="text-center text-blue font-semibold text-[30px] mb-4">
                Registration
              </h1>
              <div className="">
                <Input
                  extraCssForLabel="text-white font-semibold"
                  extraCssForInput=""
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  value={name}
                  placeholder="Enter your name"
                  onChange={handleInputValue}
                />
              </div>
              <div className="mt-4">
                <Input
                  extraCssForLabel="text-white font-semibold"
                  extraCssForInput=""
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  placeholder="Enter your email address"
                  onChange={handleInputValue}
                />
              </div>
              <div className="mt-4">
                <Input
                  extraCssForLabel="text-white font-semibold"
                  extraCssForInput=""
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleInputValue}
                />
              </div>
              <div className="mt-4">
                <Input
                  extraCssForLabel="text-white font-semibold"
                  extraCssForInput=""
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  placeholder="Re-type password"
                  onChange={handleInputValue}
                />
              </div>
              <div className="mt-8 text-center bg-blue text-white py-[10px] rounded-[8px]" onClick={userRegistration}>
                <button>Registration</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
