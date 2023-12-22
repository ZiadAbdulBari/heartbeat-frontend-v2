import React from "react";
import { ReactNode } from "react";
import Card from "../Card/Card";

interface SectionProps {
  heading: string;
  description: string;
  children: ReactNode;
}
const Section = ({ heading, description, children }: SectionProps) => {
  return (
    <div className="w-full my-[20px]">
      <div className="container mx-auto">
        <div className="mt-20">
          <h1 className="text-[50px] text-blue font-semibold text-center">
            {heading}
          </h1>
          <p className="text-gray-400 text-center w-[400px]">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Section;
