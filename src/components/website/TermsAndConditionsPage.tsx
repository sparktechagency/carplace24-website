"use client";

import Container from "@/components/ui/container";
import CarLoader from "@/components/ui/loader/CarLoader";
import { useGetTermsAndConditionsQuery } from "@/redux/apiSlice/publicSlice";

const TermsAndConditionsPage = () => {
  const { data: termsAndConditions, isLoading } =
    useGetTermsAndConditionsQuery(undefined);

  if (isLoading) {
    return <CarLoader />;
  }

  const terms = termsAndConditions?.data?.content;

  return (
    <Container>
      <div className="min-h-screen py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {terms ? (
            <div dangerouslySetInnerHTML={{ __html: terms }} />
          ) : (
            <div className="text-gray-600">No content available</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default TermsAndConditionsPage;
