"use client";
import SwiperSlides from "@/components-custom/common/SwiperSlides";
import SignupForm from "@/components-custom/SignupForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
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
          <SignupForm />


          <div className="flex justify-center items-center mt-8">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/"
                className="text-blue-950 font-bold hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default SignupPage;
