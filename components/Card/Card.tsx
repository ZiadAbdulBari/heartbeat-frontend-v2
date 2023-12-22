import { useEffect, useState } from "react";
import Image from "next/image";
import UiModal from "../ui/Modal/UiModal";
import Calender from "../Calender/Calender";
import TableBody from "../ui/Table/TableBody";
import Tr from "../ui/Table/Tr";
import Td from "../ui/Table/Td";
import Input from "../ui/Input/Input";
import { checkDate, createAppointment } from "@/services/service";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus } from "@/store/authSlice";
import { useRouter } from "next/navigation";
interface CardProps {
  section: string;
  icon: any;
  cardTitle: string;
  cardDescription: string;
  bgColor: string;
  badge: string;
  info: any;
}
const Card = ({
  icon,
  cardTitle,
  cardDescription,
  bgColor,
  badge,
  section,
  info,
}: CardProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [textColor, setTextColor] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [disease, setDisease] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const handleScheduleCheck = (e: any) => {
    e.preventDefault();
    setTextColor("");
    setMessage("");
    setIsModalOpen(true);
    setName("");
    setAge("");
    setContact("");
    setDisease("");
  };
  const checkDoctorSchedule = (data: any) => {
    setSelectedDate(data);
    checkDate(info.user_id, data).then((response: any) => {
      if (response.status == 200) {
        setTextColor("text-green-500");
      } else {
        setTextColor("text-red");
      }
      setMessage(response.message);
    });
  };
  const changeInputValue = (e: any) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "contact") {
      setContact(e.target.value);
    } else if (e.target.name == "age") {
      setAge(e.target.value);
    } else if (e.target.name == "disease") {
      setDisease(e.target.value);
    }
  };
  const handleAppointment = (e: any) => {
    e.preventDefault();
    const data = {
      doctor_name: info.name,
      doctor_id: info.user_id,
      specialist_on: info.specialist_on,
      patient_name: name,
      contact: contact,
      age: age,
      disease: disease,
      status: "Pandding",
      chosen_date: selectedDate,
    };
    createAppointment(data, token).then((response: any) => {
      if (response.status == 200) {
        setName("");
        setAge("");
        setContact("");
        setDisease("");
        setSelectedDate("");
      }
    });
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
  }, [router]);
  return (
    <div
      className={`border border-gray-200 p-[40px] rounded-[12px] ${bgColor}`}
    >
      {section == "service" && (
        <Image src={icon} alt={cardTitle + " icon"} className="mx-auto" />
      )}
      <h1 className="text-black/[0.8] text-[20px] font-semibold  text-center">
        {info.name}
      </h1>
      {section == "service" && (
        <p className="text-gray-400 text-[18px] mt-4">{cardDescription}</p>
      )}
      {section == "doctor" && (
        <>
          <div className="flex justify-between mt-8">
            <p className="bg-sky-200 px-[5px] rounded text-blach">
              {info.specialist_on}
            </p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                  fill="rgba(240,187,64,1)"
                ></path>
              </svg>
            </div>
          </div>
          <div className="flex justify-between mt-2 itemas-center">
            <p>{info.work_at}</p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="35"
                height="35"
              >
                <path
                  d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
                  fill="rgba(85,84,84,1)"
                ></path>
              </svg>
            </div>
          </div>
          <button
            className="w-full text-center bg-blue text-white  font-semibold rounded py-2 mt-8"
            onClick={handleScheduleCheck}
          >
            <div className="flex gap-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path
                  d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 10H4V19H20V10ZM15.0355 11.136L16.4497 12.5503L11.5 17.5L7.96447 13.9645L9.37868 12.5503L11.5 14.6716L15.0355 11.136ZM7 5H4V8H20V5H17V6H15V5H9V6H7V5Z"
                  fill="rgba(255,255,255,1)"
                ></path>
              </svg>
              Appointment
            </div>
          </button>
          <UiModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            data={[]}
            title="Check Doctor Schedule"
          >
            <div className="flex gap-8">
              <div className="w-[50%]">
                <TableBody tableHeader={["Day", "Time", "Chamber", "Limit"]}>
                  {info.available.length > 0 &&
                    info.available.map((schedule: any, index: number) => (
                      <Tr key={index} extrsRowCss="">
                        <Td extrsColCss="">{schedule.day}</Td>
                        <Td extrsColCss="">{schedule.time}</Td>
                        <Td extrsColCss="">{schedule.place}</Td>
                        <Td extrsColCss="">{schedule.limit}</Td>
                      </Tr>
                    ))}
                </TableBody>
                <div className="mt-4">
                  <Calender getDate={checkDoctorSchedule} />
                  <p className={`mt-4 font-medium ${textColor}`}>{message}</p>
                </div>
              </div>
              <div className="w-[50%] h-full relative">
                {/* <div className="absolute bottom-0 right-0 z-[999] bg-rose-500 h-full w-full"></div> */}
                <form>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    label="Patient name"
                    value={name}
                    placeholder="What is your name?"
                    onChange={changeInputValue}
                    extraCssForInput=""
                    extraCssForLabel=""
                  />
                  <Input
                    type="text"
                    id="contact"
                    name="contact"
                    label="Patient contact number"
                    value={contact}
                    placeholder="What is your contct number?"
                    onChange={changeInputValue}
                    extraCssForInput=""
                    extraCssForLabel=""
                  />
                  <Input
                    type="text"
                    id="age"
                    name="age"
                    label="Patient age"
                    value={age}
                    placeholder="How old are you?"
                    onChange={changeInputValue}
                    extraCssForInput=""
                    extraCssForLabel=""
                  />
                  <Input
                    type="text"
                    id="disease"
                    name="disease"
                    label="Patient disease"
                    value={disease}
                    placeholder="What is your disease?"
                    onChange={changeInputValue}
                    extraCssForInput=""
                    extraCssForLabel=""
                  />
                  <div
                    className="mt-4 flex justify-end"
                    onClick={handleAppointment}
                  >
                    <button className="px-[10px] py-[5px] bg-rose-500 rounded-[5px]">
                      Creat Appointment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </UiModal>
        </>
      )}
    </div>
  );
};

export default Card;
