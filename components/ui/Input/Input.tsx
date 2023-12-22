import React from "react";
interface InputProps {
  type: string;
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: any;
  extraCssForLabel: string;
  extraCssForInput: string;
}
const Input = ({
  type,
  id,
  label,
  value,
  placeholder,
  onChange,
  name,
  extraCssForLabel,
  extraCssForInput,
}: InputProps) => {
  return (
    // <div>
    //   <label htmlFor={id} className={`text-[18px] text-gray-900 ${extraCssForLabel}`}>
    //     {label}
    //   </label>
    //   <div className="mt-2">
    //     <input
    //       className={`input py-[8px] px-[15px] w-full border border-gray-300 rounded-[8px] ${extraCssForInput}`}
    //       id={id}
    //       type={type}
    //       name={name}
    //       placeholder={placeholder}
    //       value={value}
    //       onChange={onChangeHandle}
    //     />
    //   </div>
    // </div>
    <div
      className={`w-full ${type == "checkbox" && "flex items-center gap-x-2"}`}
    >
      <label
        className={`text-[18px] font-medium text-gray-800 ${
          type == "checkbox" && "order-last"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`text-[16px] font-medium ${
          type != "checkbox" && "h-[40px] w-full mt-1"
        } px-[20px] rounded-[8px] border border-gray-200 outline-gray-300 placeholder:text-gray-300 placeholder:text-[16px]`}
        type={type}
        id={id}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
