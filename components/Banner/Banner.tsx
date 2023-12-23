import React from "react";
import doctor1 from "../../public/img/doctor/doctor1.png";
import doctor2 from "../../public/img/doctor/doctor2.png";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="flex items-center h-[93vh] w-full bg-red/[0.05]">
      <div className="container mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-[50%]">
            <h1 className="text-blue font-semibold text-[50px]">
              <span className="font-bold text-[60px]">Welcome to Hearbeat</span>{" "}
              <br /> <span className="font-bold text-[40px] text-red">Your trusted health care provider</span>
            </h1>
          </div>
          <div className="w-[50%] flex gap-4 items-center">
            <div>
              <div className="bg-blue px-[20px] pt-[20px] rounded-[25px]">
                <Image src={doctor1} alt="Doctor Image" width={500} />
              </div>
            </div>
            <div>
              <div className="bg-red px-[20px] pt-[20px] rounded-[25px]">
                <Image src={doctor2} alt="Doctor Image" width={350} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
