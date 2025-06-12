"use client";
import SideNavBar from "@/component/common/SideNavBar";
import TopNavBar from "@/component/common/TopNavBar";
import useRequest from "@/component/hook/use-req";
import Listings from "@/component/Listings";
import { ProfileData, Property } from "@/component/types";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const ListingPage = () => {
  const [listings, setListings] = useState<Property[] | null>(null);
  const [rentedProperties, setRentedProperties] = useState<Property[] | null>(
    null
  );
  const { makeRequest: getListing } = useRequest("/properties", "GET");
  const { makeRequest: getProperties } = useRequest("/rent/rented", "GET");
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const { makeRequest: getProfile } = useRequest(`/auth/me`, "GET");

  useEffect(() => {
    const fetchProfile = async () => {
      const [response] = await getProfile();
      if (response) {
        setProfile(response);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchListing = async () => {
      const [response] = await getListing();
      if (response) {
        setListings(response?.properties);
      }
    };
    fetchListing();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      const [response] = await getProperties();
      if (response) {
        setRentedProperties(response);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen flex">
      <nav className="bg-white w-80 flex flex-col gap-10 border-r border-slate-100 shadow-lg">
        <SideNavBar />
      </nav>
      {listings ? (
        <div className="right w-full flex gap-2 flex-col">
          <TopNavBar profile={profile} />
          {listings && rentedProperties && (
            <Listings listings={listings} rentedProperties={rentedProperties} />
          )}
        </div>
      ) : (
        <div className="flex w-full justify-center items-center h-screen">
          <ClipLoader size={70} />
        </div>
      )}
    </div>
  );
};

export default ListingPage;
