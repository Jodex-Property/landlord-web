
import SideNavBar from "@/components-custom/common/SideNavBar";
import TopNavBar from "@/components-custom/common/TopNavBar";
import useRequest from "@/components-custom/hook/use-req";
import Listings from "@/components-custom/Listings";
import Pagination from "@/components-custom/pagination";
import { ProfileData, Property } from "@/components-custom/types";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProfile = async () => {
      const [response] = await getProfile();
      if (response) {
        setProfile(response);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      }
    };
    fetchProfile();
  }, [getProfile]);

  useEffect(() => {
    const fetchListing = async () => {
      const [response] = await getListing(undefined, {
        page: currentPage,
        limit: itemsPerPage,
      });
      if (response) {
        setListings(response?.properties);
        setTotalPages(Math.ceil(response.total / itemsPerPage));
      }
    };
    fetchListing();
  }, [currentPage]);

  useEffect(() => {
    const fetchProperties = async () => {
      const [response] = await getProperties(undefined, {
        page: currentPage,
        limit: itemsPerPage,
      });
      if (response) {
        setRentedProperties(response);
      }
    };
    fetchProperties();
  }, [currentPage]);

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

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

          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-center ">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
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
