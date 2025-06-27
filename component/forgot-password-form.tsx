"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";
import useRequest from "./hook/use-req";
import { forgetPasswordSchema, ForgetPasswordSchema } from "@/lib/forgot-password-schema";

const ForgetPasswordForm = () => {
  const { loading, makeRequest } = useRequest("/user/forgot-password", "POST");
  const router = useRouter();
  const form = useForm<ForgetPasswordSchema>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordSchema) => {
    const payload = {
      email: data.email,
    };

    const [response, status] = await makeRequest({ data: payload });
    if (status === 201 || status === 200) {
      showToast(response.message, true, { position: "top-right" });
      form.reset();
      router.push("/reset-verification");
    } else {
      const error = response.error || "Forgot password failed. Please try again.";
      showToast(error, false, { position: "top-right" });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-90">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Forgot Password
        </Button>
      </form>
    </Form>
  );
};

export default ForgetPasswordForm;
