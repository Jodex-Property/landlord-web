/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface PasswordInputProps {
  field: ControllerRenderProps<any, string>;
  placeholder?: string;
}

const PasswordInput = ({ field, placeholder }: PasswordInputProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        placeholder={placeholder || "Enter your password"}
        {...field}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
        aria-label={show ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
};

export default PasswordInput;
