/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signupSchema } from "@/lib/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./common/PasswordInput";
import useRequest from "./hook/use-req";
import { showToast } from "./toast";
import { useRouter } from "next/navigation";

type SignFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const { loading, makeRequest } = useRequest("/auth/signup", "POST");
  const router = useRouter();

  const form = useForm<SignFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      category: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignFormValues) => {
    const payload = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      category: data.category,
    };

    const [res, status] = await makeRequest(payload);

    if (status === 201 || status === 200 ) {
      // Save the full response in localStorage
      localStorage.setItem("user", JSON.stringify(res));

      // Optionally still store token separately
      if ((res as any)?.token) {
        localStorage.setItem("token", (res as any).token);
      }

      showToast("Signup successful!", true, { position: "top-right" });
      form.reset();
      router.push("/verification-code");
    } else {
      const message = (res as any)?.error || "Signup failed. Please try again.";
      showToast(message, false, { position: "top-right" });
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

        <FormField
          control={form.control}
          name="password"
          render={({
            field,
          }: {
            field: ControllerRenderProps<any, string>;
          }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({
            field,
          }: {
            field: ControllerRenderProps<any, string>;
          }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  field={field}
                  placeholder="Confirm your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LANDLORD">Landlord</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-950 hover:bg-blue-900 cursor-pointer transition duration-300"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
