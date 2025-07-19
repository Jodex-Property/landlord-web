

import SwiperSlides from "@/components-custom/common/SwiperSlides";
import ResetPassword from "@/components-custom/reset-password-form";
import Image from "next/image";

const ResetPasswordPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="bg-muted hidden lg:block shadow-lg">
          <SwiperSlides />
        </div>

        <div className="max-w-4xl m-auto w-full flex flex-col items-center">
           <Image
            src="/assets/img/Jodex-logo-horizonal.svg"
            alt="Jodex logo"
            width={250}
            height={250}
            className="mx-auto mb-10"
          />
          <ResetPassword />        
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
