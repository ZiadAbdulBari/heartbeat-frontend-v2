"use client";
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

  const [editSchedule, setEditSchedule] = useState(false);
  const [rowIndex, setRowIndex] = useState("");
  const [newRow, setNewRow] = useState(false);

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
  const storeSchedule = () => {
    const doctorTime = {
      day: workDay,
      time: time,
      place: place,
      limit: limit,
    };
    const newSchedule = [...schedule, doctorTime];
    setSchedule(newSchedule);
    editProfile(newSchedule);
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
  const editProfile = (available: any) => {
    const data = {
      name: name,
      email: email,
      contact: contact,
      work_at: workingPlace,
      specialist_on: specialist,
      degree: degree.split(","),
      NID: NID,
      available: available,
    };
    editProfileData(data, token).then((response: any) => {
      console.log(response);
      if (response.status == 200) {
        setIsEdit(false);
        getProfile();
        setNewRow(false);
      }
    });
  };
  const cancelPersonalInfoEdit = () => {
    setName(profileData?.name);
    setEmail(profileData?.email);
    setContact(profileData?.contact);
    setWorkingPlace(profileData?.work_at);
    setSpecialist(profileData?.specialist_on)
    setNID(profileData?.NID);
    setDegree(profileData?.degree.toString());
    setSchedule(profileData?.available);
    setIsEdit(false);
  };

  // SCHEDULE FUNCTIONSLITY
  const isEditSchedule = (index: any, rowData: any) => {
    setRowIndex(index);
    setEditSchedule(true);
    setWorkDay(rowData.day);
    setTime(rowData.time);
    setPlace(rowData.place);
    setLimit(rowData.limit);
  };
  const cancelEditing = () => {
    setRowIndex("");
    setEditSchedule(false);
    setWorkDay("");
    setTime("");
    setPlace("");
    setLimit("");
  };
  const cancelAdding = () => {
    setNewRow(false);
    setWorkDay("");
    setTime("");
    setPlace("");
    setLimit("");
  };
  const eidtRow = (index: number) => {
    const doctorTime = {
      day: workDay,
      time: time,
      place: place,
      limit: limit,
    };
    const newTime = schedule;
    newTime[index] = doctorTime;
    setSchedule(newTime);
    editProfile(newTime);
    cancelEditing();
  };
  const addRow = () => {
    setNewRow(true);
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    getProfile();
  }, [router]);
  return (
    <div className="min-h-[88vh] bg-gray-50">
      <div className="container mx-auto h-full">
        <div className="w-full h-full">
          <div className="w-[80%] mx-auto bg-white p-[30px] rounded-[12px]">
            {!isEdit && (
              <>
                <div className="flex justify-between mb-4 items-center">
                  <p className="text-[22px] text-blue">Personel informetion</p>
                  <svg
                    onClick={() => setIsEdit(true)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path
                      d="M16.7574 2.99666L14.7574 4.99666H5V18.9967H19V9.2393L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"
                      className="fill-blue"
                    ></path>
                  </svg>
                </div>
                <TableBody tableHeader={[]}>
                  <Tr extrsRowCss="bg-gray-20 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                      Name
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[18px]">
                      {profileData?.name}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-20 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                      Phone
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[18px]">
                      {profileData?.contact}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-20 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                      Email
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[18px]">
                      {profileData?.email}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-20 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                      Degree
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[18px]">
                      <div className="flex gap-2">
                        {profileData?.degree?.length > 0 &&
                          profileData?.degree?.map(
                            (education: string, index: number) => (
                              <div
                                key={index}
                                className="py-[2px] px-[5px] bg-gray-50 border border-gray-300 rounded-[8px]"
                              >
                                {education}
                              </div>
                            )
                          )}
                      </div>
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-20 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                      Speciality
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[18px]">
                      {profileData?.specialist_on}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-20 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                      Working place
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[18px]">
                      {profileData?.work_at}
                    </Td>
                  </Tr>
                  <Tr extrsRowCss="bg-gray-20 border-b">
                    <Td extrsColCss="w-[50%] px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                      NID number
                    </Td>
                    <Td extrsColCss="w-[50%] text-gray-800 text-[18px]">
                      {profileData?.NID}
                    </Td>
                  </Tr>
                </TableBody>
              </>
            )}
            {isEdit && (
              <form>
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
                <div className="flex justify-end gap-2">
                  <div
                    className="px-[15px] py-[5px] rounded-[5px] bg-red cursor-pointer text-white"
                    onClick={cancelPersonalInfoEdit}
                  >
                    Cancel
                  </div>
                  <div
                    className="px-[15px] py-[5px] rounded-[5px] bg-green-200 cursor-pointer"
                    onClick={() => editProfile(schedule)}
                  >
                    Save
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="w-[80%] mx-auto bg-white p-[30px] rounded-[12px] mt-8">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[22px] text-blue">Doctor schedule</p>
              {profileData.available?.length > 0 && (
                <svg
                  onClick={addRow}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                    className="fill-blue"
                  ></path>
                </svg>
              )}
            </div>
            <TableBody
              tableHeader={["Day", "Duration", "Chamber", "Limit", "Action"]}
            >
              {profileData.available?.length > 0 ? (
                profileData.available.map((schedule: any, index: number) =>
                  editSchedule && rowIndex == index.toString() ? (
                    <Tr key={index} extrsRowCss="bg-gray-20">
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        <OptionSelect
                          options={day}
                          onChange={handleDay}
                          selectedDay={workDay}
                        />
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        <Input
                          type="text"
                          id="time"
                          name="time"
                          label=""
                          value={time}
                          placeholder="When will you start?"
                          onChange={changeScheduleData}
                          extraCssForLabel=""
                          extraCssForInput=""
                        />
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        <Input
                          type="text"
                          id="place"
                          name="place"
                          label=""
                          value={place}
                          placeholder="Where is your chamben?"
                          onChange={changeScheduleData}
                          extraCssForLabel=""
                          extraCssForInput=""
                        />
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        <Input
                          type="text"
                          id="limit"
                          name="limit"
                          label=""
                          value={limit}
                          placeholder="How many patiences will you check?"
                          onChange={changeScheduleData}
                          extraCssForLabel=""
                          extraCssForInput=""
                        />
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        <div className="flex gap-2">
                          <div
                            className="px-[10px] py-[2px] rounded-[5px] text-white bg-red cursor-pointer"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </div>
                          <div
                            className="px-[10px] py-[2px] rounded-[5px] bg-green-200 cursor-pointer"
                            onClick={() => eidtRow(index)}
                          >
                            Edit
                          </div>
                        </div>
                      </Td>
                    </Tr>
                  ) : (
                    <Tr key={index} extrsRowCss="bg-gray-20">
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        {schedule.day}
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        {schedule.time}
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        {schedule.place}
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        {schedule.limit}
                      </Td>
                      <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                        <svg
                          onClick={() => isEditSchedule(index, schedule)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="22"
                          height="22"
                        >
                          <path
                            d="M16.7574 2.99666L14.7574 4.99666H5V18.9967H19V9.2393L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"
                            className="fill-blue"
                          ></path>
                        </svg>
                      </Td>
                    </Tr>
                  )
                )
              ) : (
                <Tr extrsRowCss="bg-gray-20">
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <OptionSelect
                      options={day}
                      onChange={handleDay}
                      selectedDay=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <Input
                      type="text"
                      id="time"
                      name="time"
                      label=""
                      value={time}
                      placeholder="When will you start?"
                      onChange={changeScheduleData}
                      extraCssForLabel=""
                      extraCssForInput=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <Input
                      type="text"
                      id="place"
                      name="place"
                      label=""
                      value={place}
                      placeholder="Where is your chamben?"
                      onChange={changeScheduleData}
                      extraCssForLabel=""
                      extraCssForInput=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <Input
                      type="text"
                      id="limit"
                      name="limit"
                      label=""
                      value={limit}
                      placeholder="How many patiences will you check?"
                      onChange={changeScheduleData}
                      extraCssForLabel=""
                      extraCssForInput=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <div className="px-[10px] rounded-[8px] bg-green-200 cursor-pointer" onClick={storeSchedule}>
                      Save
                    </div>
                  </Td>
                </Tr>
              )}
              {newRow && (
                <Tr extrsRowCss="bg-gray-20">
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <OptionSelect
                      options={day}
                      onChange={handleDay}
                      selectedDay=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <Input
                      type="text"
                      id="time"
                      name="time"
                      label=""
                      value={time}
                      placeholder="When will you start?"
                      onChange={changeScheduleData}
                      extraCssForLabel=""
                      extraCssForInput=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <Input
                      type="text"
                      id="place"
                      name="place"
                      label=""
                      value={place}
                      placeholder="Where is your chamben?"
                      onChange={changeScheduleData}
                      extraCssForLabel=""
                      extraCssForInput=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <Input
                      type="text"
                      id="limit"
                      name="limit"
                      label=""
                      value={limit}
                      placeholder="How many patiences will you check?"
                      onChange={changeScheduleData}
                      extraCssForLabel=""
                      extraCssForInput=""
                    />
                  </Td>
                  <Td extrsColCss="px-[10px] py-[8px] font-mediume text-gray-800 text-[18px]">
                    <div className="flex gap-2">
                      <div
                        className="px-[10px] py-[5px] rounded-[5px] bg-red text-white cursor-pointer"
                        onClick={cancelAdding}
                      >
                        Cancel
                      </div>
                      <div
                        className="px-[10px] py-[5px] rounded-[5px] bg-green-200 cursor-pointer"
                        onClick={storeSchedule}
                      >
                        Add
                      </div>
                    </div>
                  </Td>
                </Tr>
              )}
            </TableBody>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
