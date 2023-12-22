import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";
import Section from "@/components/Section/Section";
import doctor from "../public/img/icon/service/doctor.svg";
import booking from "../public/img/icon/service/booking.svg";
import medicine from "../public/img/icon/service/medicine.svg";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLoggedinStatus } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { getHomePageDoctor } from "@/services/service";
export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState<any>([]);
  const services = [
    {
      section: "service",
      icon: doctor,
      cardTitle: "Find a doctor",
      cardDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley",
      bgColor: "bg-gray-50",
    },
    {
      section: "service",
      icon: booking,
      cardTitle: "Book appoinement",
      cardDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley",
      bgColor: "bg-red/[0.05]",
    },
    {
      section: "service",
      icon: medicine,
      cardTitle: "Find medicine",
      cardDescription:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley",
      bgColor: "bg-gray-50",
    },
  ];
  const getDoctor = () => {
    getHomePageDoctor()
      .then((response: any) => {
        if (response.status == 200) {
          setDoctors(response.data);
        }
      })
  };
  useEffect(() => {
    getDoctor();
  }, []);
  useEffect(() => {
    if (
      window.localStorage.getItem("isLoggedin") == null ||
      window.localStorage.getItem("isLoggedin") == undefined
    ) {
      window.localStorage.setItem("isLoggedin", JSON.stringify(false));
      window.localStorage.setItem("token", JSON.stringify(""));
      window.localStorage.setItem("role", JSON.stringify(""));
      window.localStorage.setItem("user_id", JSON.stringify(""));
    }
    dispatch(getLoggedinStatus());
  }, [router]);
  return (
      <main className="">
        <Banner />
        {/* Service section */}
        <Section heading="Service" description="">
          <div className="grid grid-cols-3 mt-12 gap-4">
            {services.length > 0
              ? services.map((service, index) => {
                  return (
                    <Card
                      key={index}
                      section={service.section}
                      icon={service.icon}
                      cardTitle={service.cardTitle}
                      cardDescription={service.cardDescription}
                      bgColor={service.bgColor}
                      badge=""
                      info={[]}
                    />
                  );
                })
              : ""}
          </div>
        </Section>

        {/* doctor section */}
        <Section heading="Doctor" description="">
          <div className="grid grid-cols-4 mt-12 gap-4">
            {doctors.length > 0
              ? doctors.map((doctor: any, index: number) => {
                  return (
                    <Card
                      key={index}
                      section="doctor"
                      icon=""
                      cardTitle=""
                      cardDescription=""
                      bgColor=""
                      badge=""
                      info={doctor}
                    />
                  );
                })
              : ""}
          </div>
        </Section>
      </main>
  );
}
