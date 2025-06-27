
import SwiperSlides from "@/components-custom/common/SwiperSlides";
import PasswordVerification from "@/components-custom/password-verification";
import Image from "next/image";


const ResetVerificationPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="bg-muted hidden lg:block shadow-lg">
          <SwiperSlides />
        </div>

        <div className="max-w-4xl m-auto w-full flex flex-col items-center">
          <Image
            src="/assets/img/jodex-logo.png"
            alt="Jodex logo"
            width={150}
            height={150}
            className="mx-auto mb-10"
          />
          <PasswordVerification />
        </div>
      </div>
    </div>
  );
};

export default ResetVerificationPage;
