import api from "../api/baseApi";

const publicApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/about",
        };
      },
    }),

    getTermsAndConditions: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/terms-and-conditions",
        };
      },
    }),

    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/privacy-policy",
        };
      },
    }),

    createContactMessage: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/contact",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useGetTermsAndConditionsQuery,
  useGetPrivacyPolicyQuery,
  useCreateContactMessageMutation,
} = publicApi;
