import {AppointmentForm} from "@/components/forms/NewAppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container" >
        <div className="sub-container max-w-[860px] py-10  ">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="CarePlus Logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            userId={userId}
            patientId={patient.$id}
            type="create"
          />
          <p className="copyright py-12">&copy; 2024 CarePlus</p>
        </div>
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        alt="Patient"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default NewAppointment;
