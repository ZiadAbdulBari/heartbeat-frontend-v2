import Image from "next/image";
import React, { useEffect } from "react";
import logo from "../../public/img/logo.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus } from "@/store/authSlice";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedin = useSelector((state: any) => state.auth.isLoggedin);
  const role = useSelector((state: any) => state.auth.role);
  const logout = () => {
    window.localStorage.removeItem("isLoggedin");
    window.localStorage.setItem("token", JSON.stringify(""));
    window.localStorage.setItem("role", JSON.stringify(""));
    window.localStorage.setItem("role", JSON.stringify(""));
    dispatch(getLoggedinStatus());
    router.push('/')
  };
  useEffect(()=>{
    dispatch(getLoggedinStatus());
  },[router])
  return (
    <div className="w-full bg-gray-50 py-2">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src={logo} width={200} alt="Logo" />
          </Link>
          <div>
            <ul className="flex space-x-4">
              <li>Home</li>
              <li>Service</li>
              <li>Find doctor</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="flex gap-x-2">
            {!isLoggedin ? (
              <>
                <div className="px-8 bg-blue py-1 rounded-full text-white cursor-pointer">
                  <Link href="/signup">Registration</Link>
                </div>
                <div className="px-8 bg-red py-1 rounded-full text-white cursor-pointer">
                  <Link href="/signin">Login</Link>
                </div>
              </>
            ) : (
              <div className="relative z-50 cursor-pointer group">
                <div className="flex gap-2 items-center">
                  <div className="h-[35px] w-[35px] rounded-full border-2 border-gray-800">
                    {/* <img
                            src="../../image/default-image.jpg"
                            alt=""
                            className="w-[30px]"
                          /> */}
                  </div>
                  <svg
                    className="rotate-0 duration-300 group-hover:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      className="fill-orange-500"
                      d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"
                    ></path>
                  </svg>
                </div>
                <div className=" absolute left-[-20px] bg-gray-50 text-gray-700 max-w-[300px] w-[200px] rounded-[8px] hidden group-hover:block">
                  <div className="w-full px-[20px] py-[10px]">
                    <ul>
                      <li>
                        <Link href="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link href="/history">History</Link>
                      </li>
                      <li><Link href={"/serial"}>Today&apos;s serial</Link></li>
                      <li onClick={logout}>Logout</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
