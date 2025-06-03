/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MetricData {
 totalTenants: number;
    totalListings: number;
    totalEarnings: number;
    occupancyRate: number;
    activeListings: number;
}

export interface ChartData {
 monthlyRevenue: {
      month: string;
      amount: number;
    }[];
}

export interface ListingData {
upcomingInspections: any[]; 
}

export interface ProfileData {
  username?: string;
  email?: string;
  phone?: string;
  address?: string;
  lastLogin?: string;
  name?:string;
  businessName?:string;
  cac?:string;
  dateOfBirth?:string;
  category?:string;
  gender?:string;
  maritalStatus?:string;
}

export interface User {
  id?: string;
  email?: string;
  password?: string;
  category?: string;
  isVerified?: boolean;
  verificationCode?: string | null;
  codeExpiresAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  name?: string;
  contactNumber?: string | null;
  dateOfBirth?: string;
  maritalStatus?: string | null;
  gender?: string | null;
  nin?: string | null;
  businessName?: string | null;
  address?: string | null;
  profilePicture?: string | null;
  cac?: string | null;
}

export interface Property {
  id?: string;
  userId?: string;
  propertyType?: string;
  units?: number;
  address?: string;
  city?: string;
  state?: string;
  furnished?: boolean;
  condition?: string;
  description?: string;
  availability?: string;
  duration?: string;
  utility?: boolean;
  rooms?: number;
  bathrooms?: number;
  kitchen?: number;
  rent?: number;
  agency?: number;
  caution?: number;
  legal?: number;
  total?: number;
  amenities?: string[]; // Some may still be stringified arrays
  pictures?: string[];  // Image URLs or base64 strings
  createdAt?: string;
  rental?: any[];        // Replace with your actual Rental type
  Payment?: any[];       // Replace with your actual Payment type
  Inspection?: any[];    // Replace with your actual Inspection type
  user?: User;
}



