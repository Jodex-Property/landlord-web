/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { showToast } from "./toast";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { VerificationCodeSchema } from "@/lib/verify-code-schema";
import useRequest from "./hook/use-req";


// Define schema directly since we can't import from lib

type VerificationValues = z.infer<typeof VerificationCodeSchema>;

const PasswordVerification = () => {
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState(10); // 10 seconds countdown
  const { loading, makeRequest } = useRequest("/user/verify-code", "POST");
  const router = useRouter();


  const form = useForm<VerificationValues>({
    defaultValues: {
      code: "",
    },
  });

  // Update form value when OTP changes
  useEffect(() => {
    if (value) {
      form.setValue("code", value);
    }
  }, [value, form]);

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Handle resend code
  //   const handleResendCode = async () => {
  //     try {
  //       showToast("Verification code resent!", true, { position: "top-right" });
  //       setTimer(30);
  //     } catch (error) {
  //       showToast("Failed to resend code", false, { position: "top-right" });
  //     }
  //   };

  const onSubmit = async (data: VerificationValues) => {
    const payload = {
      code: data.code,
    };

    const [res, status] = await makeRequest({ data: payload });

    if (status === 200) {
      showToast("Verification successful!", true, { position: "top-right" });
      form.reset();
      router.push("/reset-password");
    } else {
      const message =
        (res as any)?.message || "Verification failed. Please try again.";
      showToast(message, false, { position: "top-right" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-blue-950 text-lg font-bold">
          Please input your verification code
        </h1>
        <p className="text-blue-950 text-sm">
          OTP message has been sent to your email
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          <Controller
            name="code"
            control={form.control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={(val) => {
                  field.onChange(val);
                  setValue(val);
                }}
                className="flex justify-center gap-2"
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="border-gray-500 w-12 h-12 text-center text-xl"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          <Button
            type="submit"
            disabled={loading || form.getValues("code").length !== 6}
            className="w-full bg-blue-950 hover:bg-blue-900 cursor-pointer transition duration-300 text-white"
          >
            {loading ? "Verifying..." : "Proceed"}
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            {timer > 0 ? (
              <>Resend code in ({timer}s)</>
            ) : (
              <Button
                className="text-white bg-blue-950 w-full hover:bg-blue-900 font-medium"
                type="button"
              >
                Resend Code
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordVerification;
