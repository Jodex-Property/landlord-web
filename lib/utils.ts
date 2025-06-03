import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function signOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
    // localStorage.removeItem("profilePhoto");
  // localStorage.removeItem("userEmail");
  // localStorage.removeItem("showAccountSetupWarning");
}