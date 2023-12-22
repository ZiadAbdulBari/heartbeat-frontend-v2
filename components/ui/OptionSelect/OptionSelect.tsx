import React, { ChangeEvent } from "react";
interface OptionSelectProps {
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const OptionSelect: React.FC<OptionSelectProps> = ({options,onChange}) => {
  return (
    <div>
      <label className="text-[18px] font-medium text-gray-800" htmlFor="day"> Select Day</label>
      <br/>
      <select id="day" name="day" onChange={onChange} className="px-[20px] rounded-[8px] border border-gray-200 outline-gray-300 text-[16px] font-medium  w-full py-[8px]">
        <option value="none" className="text-gray-300">
          Select a day
        </option>
        {
            options.length>0 && (
                options.map((option:string,index:number)=>
                    (
                        <option key={index} value={option}>{option}</option>
                    )
                )
            )
        }
      </select>
    </div>
  );
};

export default OptionSelect;
