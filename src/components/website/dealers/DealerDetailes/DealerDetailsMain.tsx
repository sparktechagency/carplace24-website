"use client";

import CarLoader from "@/components/ui/loader/CarLoader";
import Container from "@/components/ui/container";
import { useGetDealerByIdQuery } from "@/redux/apiSlice/dealerSlice";
import DealerProfileCard from "./DealerProfileCard";
import DealerCarsGrid from "./DealerCarsGrid";
import { DealerData } from "./types";

const DealerDetailsMain = ({ id }: { id: string }) => {
  const {
    data: getDealerDetails,
    isLoading,
    isError,
  } = useGetDealerByIdQuery(id);

  if (isLoading) return <CarLoader />;

  if (isError) {
    return (
      <div className="min-h-screen py-10 bg-gray-50">
        <Container>
          <div className="text-center text-red-500">
            <p>Failed to load dealer details. Please try again later.</p>
          </div>
        </Container>
      </div>
    );
  }

  const dealerData: DealerData = getDealerDetails?.data;
  const { dealerProfile, cars } = dealerData || {};

  if (!dealerProfile) {
    return (
      <div className="min-h-screen py-10 bg-gray-50">
        <Container>
          <div className="text-center text-gray-500">
            <p>Dealer not found.</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <Container>
        <DealerProfileCard dealer={dealerProfile} />
        <DealerCarsGrid cars={cars || []} />
      </Container>
    </div>
  );
};

export default DealerDetailsMain;
