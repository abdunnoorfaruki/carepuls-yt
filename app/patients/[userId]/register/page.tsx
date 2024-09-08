// next
import Image from "next/image";
// custome components
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import { useParams } from "next/navigation";
// shadcn components

const  Register = async ({params:{userId }}:SearchParamProps) => {


  const user = await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container" >
        <div className="sub-container max-w-[860px] py-10  ">
          <Image src="/assets/icons/logo-full.svg" alt="CarePlus Logo" width={1000} height={1000} className="mb-12 h-10 w-fit"  />

          <RegisterForm user={user} />
            <p className="copyright py-12">
              &copy; 2024 CarePlus
            </p>
        </div>
      </section>
      <Image src={"/assets/images/register-img.png"} alt="Patient" height={1000} width={1000} className="side-img max-w-[390px]" />
      
    </div>
  );
}

export default Register