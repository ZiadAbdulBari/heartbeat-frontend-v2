// import Cart from "@/components/Cart/Cart";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const MainLayout = ({ children }:{ children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [path, setpath] = useState(pathname.split("/")[1]);
  useEffect(() => {
    setpath(pathname.split("/")[1]);
  }, [pathname]);
  return (
    <div>
      {path == "signup" || path == "signin" ? "" : <Navbar />}
      <div className="min-h-[89vh]">{children}</div>
      {path == "signup" || path == "signin" ? "" : <Footer />}
    </div>
  );
};

export default MainLayout;
