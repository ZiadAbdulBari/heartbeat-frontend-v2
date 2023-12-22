import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const Calender = ({getDate}:any) => {
  const [value, setValue] = useState<Value>(new Date());
  const getDoctorSchedule = (date:any, even:any) => {
    getDate(date?.toLocaleString());
  };
  return (
    <div className="text-center">
      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={(value, event) => getDoctorSchedule(value, event)}
        // tileDisabled={({ activeStartDate, date, view }) => date.getDay()!=2 && date.getDay()!=4}
        // tileContent={({ date, view }) => date.getDay}
      />
    </div>
  );
};

export default Calender;
