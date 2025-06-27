"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/lib/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordInput from "./common/PasswordInput";
import { Button } from "@/components/ui/button";
import { showToast } from "./toast";
import useRequest from "./hook/use-req";
import { useRouter } from "next/navigation";

type LoginFormValues = z.infer<typeof loginSchema>;
type AuthResponse = {
  token: string;
  user?: {
    id: string;
    email: string;
    isVerified: boolean; 
  };
  message?: string;
};

const LoginForm = () => {
  const { loading, makeRequest } = useRequest("/auth/login", "POST");
    const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

const onSubmit = async (data: LoginFormValues) => {
  const payload = {
    email: data.email,
    password: data.password,
  };

  const [res, status] = await makeRequest(payload);

  const response = res as AuthResponse;

  if (status === 201 || status === 200) {
      // Save the full response in localStorage
    localStorage.setItem("user", JSON.stringify(res));

    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    showToast("Login successful!", true, { position: "top-right" });
    form.reset();
 if (response.user?.isVerified === false) {
    router.push("/verification-code");
  } else {
    router.push("/dashboard");
  }
  } else {
    const message = response.message || "Login failed. Please try again.";
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
                <Input
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
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

        <a
          href="/forgot-password"
          className="text-blue-950 font-medium text-[15px] hover:underline"
        >
          Forget Password?
        </a>

        <Button
          type="submit"
          className="w-full mt-5 bg-blue-950 hover:bg-blue-900 cursor-pointer transition duration-300"
        >
         {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
