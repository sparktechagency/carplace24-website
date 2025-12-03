"use client";

import Container from "@/components/ui/container";
import CarLoader from "@/components/ui/loader/CarLoader";
import {
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
} from "@/redux/apiSlice/publicSlice";

const PrivacyPolicyPage = () => {
  const { data: privacyPolicy, isLoading } =
    useGetPrivacyPolicyQuery(undefined);

  if (isLoading) {
    return <CarLoader />;
  }

  const policy = privacyPolicy?.data?.content;

  return (
    <Container>
      <div className="min-h-screen py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          {policy ? (
            <div dangerouslySetInnerHTML={{ __html: policy }} />
          ) : (
            <div className="text-gray-600">No content available</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PrivacyPolicyPage;
