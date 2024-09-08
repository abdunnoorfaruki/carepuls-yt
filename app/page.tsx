// next
import Image from "next/image";
// custome components
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";
// shadcn components

export default function Home({searchParams}:SearchParamProps) {

  const isAdmin = searchParams.admin === "true"


  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto " >
      {isAdmin && (<PasskeyModal />)}
        <div className="sub-container max-w-[496px]  ">
          <Image src="/assets/icons/logo-full.svg" alt="CarePlus Logo" width={1000} height={1000} className="mb-12 h-10 w-fit"  />

          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 CarePlus
            </p>
            <Link href={"/?admin=true"} className="text-green-50" >Admin</Link>
          </div>
        </div>
      </section>
      <Image src={"/assets/images/onboarding-img.png"} alt="Patient" height={1000} width={1000} className="side-img max-w-[50%]" />
      
    </div>
  );
}
