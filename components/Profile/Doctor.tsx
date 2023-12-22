"use client"
import React, { useEffect, useState } from "react";
import TableBody from "../ui/Table/TableBody";
import Tr from "../ui/Table/Tr";
import Td from "../ui/Table/Td";
import Input from "../ui/Input/Input";
import OptionSelect from "../ui/OptionSelect/OptionSelect";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { editProfileData, getProfileData } from "@/services/service";
import { getLoggedinStatus } from "@/store/authSlice";
const Doctor = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const [profileData, setProfileData] = useState<any>({});
  const [isEdit, setIsEdit] = useState(false);
  const [fulfill, setFulfill] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [workingPlace, setWorkingPlace] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [degree, setDegree] = useState("");
  const [NID, setNID] = useState("");
  const [day, setDay] = useState([
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]);
  const [workDay, setWorkDay] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [limit, setLimit] = useState("");
  const [schedule, setSchedule] = useState<
    Array<{ day: string; time: string; place: string; limit: string }>
  >([]);
  const changeInputValue = (e: any) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "contact") {
      setContact(e.target.value);
    } else if (e.target.name == "work_at") {
      setWorkingPlace(e.target.value);
    } else if (e.target.name == "specialist_on") {
      setSpecialist(e.target.value);
    } else if (e.target.name == "degree") {
      setDegree(e.target.value);
    } else if (e.target.name == "NID") {
      setNID(e.target.value);
    }
  };
  const changeScheduleData = (e: any) => {
    if (e.target.name == "time") {
      setTime(e.target.value);
    } else if (e.target.name == "place") {
      setPlace(e.target.value);
    } else if (e.target.name == "limit") {
      setLimit(e.target.value);
    }
  };
  const handleDay = (e: any) => {
    setWorkDay(e.target.value);
  };
  const storeSchedule = (e: any) => {
    e.preventDefault();
    const doctorTime = {
      day: workDay,
      time: time,
      place: place,
      limit: limit,
    };
    const newSchedule = [...schedule, doctorTime];
    setSchedule(newSchedule);
    setWorkDay("");
    setTime("");
    setPlace("");
    setLimit("");
  };
  const getProfile = () => {
    getProfileData(token).then((response: any) => {
      if (response.status == 200) {
        setProfileData(response.data);
        setName(response?.data?.name);
        setEmail(response?.data?.email);
        setContact(response?.data?.contact);
        setWorkingPlace(response?.data?.work_at);
        setSpecialist(response?.data?.specialist_on);
        setNID(response?.data?.NID);
        setDegree(response?.data?.degree.toString());
        setSchedule(response?.data?.available);
      }
    });
  };
  const editProfile = (e: any) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      contact:contact,
      work_at: workingPlace,
      specialist_on: specialist,
      degree: degree.split(','),
      NID: NID,
      available: schedule,
    };
    editProfileData(data, token).then((response: any) => {
      if(response.status==200){
        setIsEdit(false);
        setFulfill(false);
        getProfile();
      }
    });
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    getProfile();
  }, [router]);
  // DATA FORMET
  // [
  //   {
  //     day:'sunday',
  //     time:'7pm',
  //     place:"Greenlife Hospital",
  //     patient_limit:"10"
  //   },
  //   {
  //     day:'monday',
  //     time:'7pm',
  //     place:"Greenlife Hospital",
  //     patient_limit:"20"
  //   },
  // ]
  return (
    <div className="min-h-[88vh] bg-gray-100">
      <div className="container mx-auto">
        <div className="w-full h-[200px] relative mt-4">
          <div className="flex">
            <div className="p-[25px] rounded-full bg-red overflow-hidden absolute top-0 left-0 z-30">
              <svg
                fill="#000000"
                height="150px"
                width="150px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 447.3 447.3"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path d="M434.398,432.3h-50.977v-15.368c0-35.193-9.385-62.355-27.894-80.732c-23.588-23.419-53.218-23.474-54.407-23.474H263.55 v-23.937c24-9.945,39.174-26.501,48.42-40.857c14.433-22.41,17.688-43.977,17.819-44.884c0.052-0.356,0.078-0.716,0.078-1.076 v-1.606c5.268-1.299,9.851-4.017,13.49-8.046c10.618-11.757,10.002-30.306,9.244-37.735c-0.577-5.654-3.136-10.399-7.399-13.722 c-4.663-3.635-10.551-4.904-15.335-5.257v-14.362V71.496c0-23.59-9.757-39.361-29.829-48.213c-3.558-1.569-5.293-3.767-5.628-7.129 c-0.31-3.105,0.702-5.931,0.701-5.931c1.292-3.316,0.076-7.083-2.909-9.018c-2.986-1.936-6.922-1.505-9.42,1.028 c-10.712,10.865-21.412,11.063-44.6,10.478c-15.107-0.383-33.914-0.858-58.682,2.685c-34.15,4.885-49.299,25.993-55.994,42.84 c-6.687,16.825-6.293,32.547-6.198,34.777v42.588c-4.795,0.347-10.71,1.612-15.391,5.262c-4.264,3.323-6.822,8.067-7.398,13.723 c-0.758,7.429-1.374,25.978,9.244,37.734c3.68,4.074,8.326,6.804,13.668,8.085v1.567c0,0.36,0.026,0.72,0.078,1.076 c0.131,0.907,3.387,22.474,17.819,44.884c9.246,14.355,24.42,30.912,48.42,40.857v23.937h-37.518 c-1.286-0.008-30.869,0.051-54.461,23.474c-18.509,18.377-27.894,45.54-27.894,80.732V432.3H12.902c-4.143,0-7.5,3.358-7.5,7.5 c0,4.142,3.357,7.5,7.5,7.5h421.497c4.143,0,7.5-3.358,7.5-7.5C441.898,435.658,438.541,432.3,434.398,432.3z M368.422,416.932 V432.3h-98.983V327.726h30.377v29.061c-6.453,2.338-11.751,7.259-15.274,14.326c-3.188,6.392-3.938,12.439-4.013,13.107 c-0.031,0.278-0.047,0.557-0.047,0.837v20.418c0,4.142,3.358,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5v-19.918 c0.329-2.17,2.56-14.093,11.834-15.23c9.264,1.135,11.498,13.027,11.834,15.233v19.915c0,4.142,3.357,7.5,7.5,7.5 s7.5-3.358,7.5-7.5v-20.418c0-0.28-0.016-0.559-0.047-0.837c-0.075-0.668-0.825-6.716-4.013-13.107 c-3.523-7.067-8.821-11.988-15.274-14.326v-26.963c8.668,2.283,20.103,7.051,30.144,17.02 C360.528,362.302,368.422,385.883,368.422,416.932z M223.645,360.05c12.386,0,23.471-5.674,30.794-14.559V432.3h-62.077v-87.431 C199.675,354.106,210.976,360.05,223.645,360.05z M337.68,156.107c0.891,8.74-0.073,20.201-5.454,26.159 c-0.721,0.798-1.509,1.456-2.358,2.008v-33.596c2.325,0.268,4.651,0.866,6.132,2.029 C336.716,153.271,337.476,154.115,337.68,156.107z M137.446,63.777c7.608-19.145,22.473-30.426,44.18-33.531 c23.52-3.365,41.629-2.907,56.178-2.538c16.958,0.429,30.476,0.771,42.665-5.32c1.788,5.782,5.873,11.25,13.517,14.621 c14.637,6.455,20.882,16.769,20.882,34.488v41.92c-13.191-1.157-23.001-5.483-29.192-12.929 c-11.172-13.435-7.638-33.337-7.605-33.512c0.654-3.394-1.097-6.795-4.239-8.236c-3.141-1.441-6.861-0.546-9.007,2.164 c-13.583,17.166-32.971,23.681-57.618,19.355c-19.413-3.405-34.906-12.473-35.053-12.559c-1.994-1.186-4.424-1.382-6.582-0.533 c-2.158,0.85-3.802,2.651-4.452,4.878c-6.598,22.617-20.094,31.577-28.81,35.088V92.838c0-0.141-0.004-0.282-0.012-0.422 C132.289,92.279,131.59,78.512,137.446,63.777z M114.896,182.266c-5.381-5.958-6.345-17.419-5.454-26.158 c0.204-1.993,0.964-2.838,1.681-3.401c1.518-1.193,3.926-1.794,6.31-2.051v33.729C116.513,183.813,115.666,183.119,114.896,182.266 z M148.239,240.272c-11.735-18.011-15.267-35.842-15.808-38.914v-78.455c10.271-2.907,29.481-11.742,40.144-38.14 c7.16,3.339,18.479,7.834,31.589,10.19c23.074,4.146,43.105,0.162,58.905-11.544c1.088,8.354,4.017,18.125,10.974,26.55 c9.075,10.988,22.787,17.202,40.824,18.519v17.038v55.84c-0.548,3.107-4.083,20.921-15.808,38.915 c-16.809,25.798-41.946,39.985-74.714,42.169h-1.393C190.186,280.257,165.048,266.07,148.239,240.272z M222.222,297.426 c0.162,0.01,0.323,0.016,0.485,0.016h1.885c0.162,0,0.323-0.005,0.485-0.016c8.5-0.551,16.299-1.832,23.473-3.668v26.203 c-0.002,0.065-0.01,0.128-0.01,0.194c0,13.727-11.168,24.896-24.896,24.896c-13.727,0-24.895-11.169-24.895-24.896v-26.397 C205.923,295.594,213.722,296.875,222.222,297.426z M143.316,372.312c7.261,0,13.167,5.906,13.167,13.167 c0,7.26-5.906,13.167-13.167,13.167c-7.261,0-13.167-5.906-13.167-13.167C130.149,378.219,136.055,372.312,143.316,372.312z M78.877,416.932c0-67.679,38.011-84.016,56.938-87.956v29.357c-11.9,3.293-20.667,14.211-20.667,27.145 c0,15.531,12.636,28.167,28.167,28.167c15.531,0,28.167-12.635,28.167-28.167c0-12.934-8.767-23.853-20.667-27.145v-30.607h26.546 V432.3H78.877V416.932z"></path>{" "}
                    <circle cx="170.413" cy="139.623" r="8.952"></circle>{" "}
                    <circle cx="276.887" cy="139.624" r="8.951"></circle>{" "}
                    <path d="M270.144,232.364c2.601-3.225,2.095-7.946-1.13-10.546c-3.225-2.602-7.947-2.094-10.546,1.129 c-0.08,0.1-9.089,9.939-32.971,9.939c-24.809,0-36.903-10.295-37.494-10.812c-3.061-2.749-7.774-2.52-10.552,0.528 c-2.791,3.061-2.572,7.805,0.489,10.595c0.657,0.6,16.467,14.689,47.557,14.689C256.723,247.886,268.862,233.952,270.144,232.364z"></path>{" "}
                    <path d="M221.716,192.351h3.867c9.925,0,18-8.075,18-18c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5c0,1.654-1.346,3-3,3 h-3.867c-1.654,0-3-1.346-3-3c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5 C203.716,184.277,211.791,192.351,221.716,192.351z"></path>{" "}
                    <circle cx="143.316" cy="385.479" r="4.666"></circle>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className="py[190px] h-[200px] bg-blue text-white w-full text-[40px] absolute top-0 left-0 z-10 rounded-l-full">
              <p className="absolute top-[50%] left-[220px] -translate-y-[50%] uppercase">
                {profileData?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20 w-full">
          <div className="w-[80%] mx-auto bg-white p-[30px] rounded-[12px]">
            {!isEdit && (
              <>
                <div
                  className="float-right mb-4 cursor-pointer"
                  onClick={() => setIsEdit(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                  >
                    <path
                      d="M16.7574 2.99666L14.7574 4.99666H5V18.9967H19V9.2393L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"
                      className="fill-blue"
                    ></path>
                  </svg>
                </div>
                <TableBody tableHeader={[]}>
                  <Tr extrsRowCss="bg-gray-100 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                      Name
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                      {profileData?.name}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-50 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                      Phone
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                      {profileData?.contact}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-100 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                      Email
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                      {profileData?.email}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-100 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                      Degree
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                      <div className="flex gap-2">
                        {profileData?.degree?.length > 0 &&
                          profileData?.degree?.map(
                            (education: string, index: number) => (
                              <div
                                key={index}
                                className="py-[2px] px-[5px] bg-gray-200 border border-gray-400 rounded-[8px]"
                              >
                                {education}
                              </div>
                            )
                          )}
                      </div>
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-100 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                      Speciality
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                      {profileData?.specialist_on}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-100 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                      Working place
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                      {profileData?.work_at}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-100 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-semibold text-gray-600 text-[20px]">
                      NID number
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[20px]">
                      {profileData?.NID}
                    </Td>
                  </Tr>
                </TableBody>
              </>
            )}
            {isEdit && (
              <form>
                {!fulfill && (
                  <div>
                    <div className="grid grid-cols-2 gap-6">
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        label="Name"
                        value={name}
                        placeholder="Enter your name"
                        onChange={changeInputValue}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        label="Email Address"
                        value={email}
                        placeholder="Enter your email address"
                        onChange={changeInputValue}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="text"
                        id="contact"
                        name="contact"
                        label="Contact Number"
                        value={contact}
                        placeholder="Enter your contact number"
                        onChange={changeInputValue}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="text"
                        id="work_at"
                        name="work_at"
                        label="Working Place"
                        value={workingPlace}
                        placeholder="White your working place address"
                        onChange={changeInputValue}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="text"
                        id="specialist_on"
                        name="specialist_on"
                        label="Specialist"
                        value={specialist}
                        placeholder="White your working place address"
                        onChange={changeInputValue}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="text"
                        id="degree"
                        name="degree"
                        label="Degree"
                        value={degree.toString()}
                        placeholder="White your degrees"
                        onChange={changeInputValue}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="text"
                        id="NID"
                        name="NID"
                        label="NID Number"
                        value={NID}
                        placeholder="White your NID number"
                        onChange={changeInputValue}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                    </div>
                    <div className="flex justify-end gap-6 mt-8">
                      <button
                        className="bg-red text-white px-[20px] py-[10px] rounded-[8px]"
                        onClick={() => setIsEdit(false)}
                      >
                        Cancle
                      </button>
                      <button
                        className="bg-blue text-white px-[20px] py-[10px] rounded-[8px]"
                        onClick={() => setFulfill(true)}
                      >
                        Next Page
                      </button>
                    </div>
                  </div>
                )}
                {fulfill && (
                  <div>
                    <div className="grid grid-cols-5 gap-6">
                      <div className="flex justify-center items-center">
                        <OptionSelect options={day} onChange={handleDay} />
                      </div>
                      <Input
                        type="text"
                        id="time"
                        name="time"
                        label="Duration"
                        value={time}
                        placeholder="When will you start?"
                        onChange={changeScheduleData}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="text"
                        id="place"
                        name="place"
                        label="Chamber address"
                        value={place}
                        placeholder="Where is your chamben?"
                        onChange={changeScheduleData}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <Input
                        type="text"
                        id="limit"
                        name="limit"
                        label="Maximum patient"
                        value={limit}
                        placeholder="How many patiences will you check?"
                        onChange={changeScheduleData}
                        extraCssForLabel=""
                        extraCssForInput=""
                      />
                      <div className="flex justify-center items-center mt-[24px]">
                        <button onClick={storeSchedule}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"
                              fill="rgba(100,205,138,1)"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end" onClick={editProfile}>
                      <button className="px-[10px] py-[5px] rounded-[5px] bg-red">
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </form>
              // <>
              // </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
