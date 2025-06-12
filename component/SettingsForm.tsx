/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { profileSchema } from "@/lib/profile-schema";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useApi from "./hook/request";
import { showToast } from "./toast";
import { ProfileData } from "./types";
import ImageCard from "./common/ImageCard";
import { ClipLoader } from "react-spinners";

type ProfileFormValues = z.infer<typeof profileSchema>;

const SettingsForm = () => {
 
  const { makeRequest, loading } = useApi("/user/profile-picture", "PUT",);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { makeRequest: getProfile } = useApi(`/auth/me`, "GET");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      gender: undefined,
      dateOfBirth: "",
      nin: "",
      maritalStatus: undefined,
      businessName: "",
      address: "",
      option: undefined,
      cac: undefined,
      profilePicture: undefined,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("name", data.name);
    formData.append("contactNumber", data.contactNumber);
    formData.append("gender", data.gender ?? "");
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("nin", data.nin);
    formData.append("maritalStatus", data.maritalStatus ?? "");
    formData.append("businessName", data.businessName);
    formData.append("address", data.address);
    formData.append("option", data.option ?? "");

    if (data.cac) {
      formData.append("cac", data.cac);
    }
    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }

    const [res, status] = await makeRequest(formData);

    if (status === 200) {
      showToast("Profile update successful!", true, { position: "top-right" });

      setProfile((prev) => ({
        ...prev,
        ...res, // Assuming the response contains the updated profile data
      }));
    } else {
      const message =
        (res as any)?.message || "Profile update failed. Please try again.";
      showToast(message, false, { position: "top-right" });
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const [response] = await getProfile();
      if (response) {
        setProfile(response);

        // Only reset form values once when data is first loaded
        form.reset({
          name: response.name || response.name || "",
          email: response.email || "",
          contactNumber: response.contactNumber || response.phone || "",
          nin: response.nin || "",
          profilePicture: response.profilePicture || "",
          address: response.address || "",
          dateOfBirth: response.dateOfBirth || "",
          gender: response.gender || "",
          maritalStatus: response.maritalStatus || "",
          businessName: response.businessName || "",
        });
      }
    };

    fetchProfile();
  }, []);

  return (
    <Card className=" shadow-none border-none">
      <ImageCard
        profilePicture={form.watch("profilePicture") || profile?.profilePicture}
        name={form.watch("name") || profile?.name}
        onUploadClick={handleUploadClick}
      />
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".png,.jpg,.jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  form.setValue("profilePicture", file);
                }
              }}
              className="hidden"
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contactNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="dateOfBirth"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="maritalStatus"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="option"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select One</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Landlord or Property Manager" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Landlord">Landlord</SelectItem>
                      <SelectItem value="Property Manager">
                        Property Manager
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="nin"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="businessName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="cac"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-2">
                  <FormLabel>Upload CAC Documents</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.doc"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground mt-1">
                    Accepted formats: .pdf, .png, .jpg, .jpeg, .doc
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-1  md:col-span-2 flex justify-end gap-4">
              <Button variant="outline" type="button">
                Discard
              </Button>
              {loading ? (
                <ClipLoader loading={loading} />
              ) : (
                <Button className="cursor-pointer" type="submit">Save</Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsForm;
