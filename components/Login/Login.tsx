"use client"
import React, { useState } from "react";
import auth from "../../public/img/doctor/auth.jpg";
import Image from "next/image";
import Input from "../ui/Input/Input";
import Link from "next/link";
import { login } from "@/services/service";
import { useDispatch } from "react-redux";
import { getLoggedinStatus } from "@/store/authSlice";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleInputValue = (e: any) => {
    e.preventDefault();
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };
  const userLogin = (e:any)=>{
    login(email,password)
    .then((response:any)=>{
      if(response.status==200){
        window.localStorage.setItem('isLoggedin',JSON.stringify(true));
        window.localStorage.setItem('token',JSON.stringify(response. access_token));
        window.localStorage.setItem('role',JSON.stringify(response.role));
        window.localStorage.setItem('user_id',JSON.stringify(response.user_id));
        dispatch(getLoggedinStatus());
        router.push('/');
      }
    })
  }
  return (
    <div className="relative h-screen w-full z-20">
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
      <div className="flex justify-between w-full h-screen">
        <div className="w-[50%] h-screen">
          <Image src={auth} alt="Image" className="h-screen" />
        </div>
        <div className="flex justify-center items-center w-[50%] h-screen bg-blue/[0.1]">
          <div className="bg-red rounded-[12px] px-[30px] py-[40px] w-[50%]">
            <h1 className="text-center text-blue font-semibold text-[30px] mb-4">
              Login
            </h1>
            <div>
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
            <div className="mt-8 text-center bg-blue text-white py-[10px] rounded-[8px]" onClick={userLogin}>
              <button>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
