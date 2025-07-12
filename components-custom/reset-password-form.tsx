"use client";

import React, { useEffect, useState } from "react";
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
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/lib/reset-password-schema";
import { showToast } from "./toast";
import { useRouter } from "next/navigation";
import useRequest from "./hook/use-req";

const ResetPassword = () => {
  const { loading, makeRequest } = useRequest("/user/reset-password", "POST");
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");

  // Get email from localStorage after component mounts (client-side only)
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "");
  }, []);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Update form email when userEmail state changes
  useEffect(() => {
    if (userEmail) {
      form.setValue("email", userEmail);
    }
  }, [userEmail, form]);

  const onSubmit = async (data: ResetPasswordSchema) => {
   
      const payload = {
        email: userEmail || data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const [response, status] = await makeRequest(payload);
      
      if (status === 201 || status === 200) {
        // console.log("✅ Password reset successful:", response);
        showToast(response?.message || "Password reset successful", true, { 
          position: "top-right" 
        });
        form.reset();
        router.push("/");
      } else {
        const error = response?.error || response?.message || "Password reset failed. Please try again.";
        console.error("❌ Password reset failed:", error);
        showToast(error, false, { position: "top-right" });
      }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-90">
        {/* Debug: Show current email */}
        {userEmail && (
          <div className="text-sm text-gray-600">
            Resetting password for: {userEmail}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
        
        
      </form>
    </Form>
  );
};

export default ResetPassword;