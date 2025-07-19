
import SwiperSlides from "@/components-custom/common/SwiperSlides";
import ForgetPasswordForm from "@/components-custom/forgot-password-form";
import Image from "next/image";
import Link from "next/link";

const ForgotPasswordPage = () => {
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
          <ForgetPasswordForm />
          <div className="flex justify-center items-center mt-8">
            <p className="text-sm text-gray-500">
              Return to main page{" "}
              <Link
                href="/"
                className="text-blue-950 font-bold hover:underline"
              >
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
