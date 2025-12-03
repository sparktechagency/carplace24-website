import api from "../api/baseApi";

const subscriptionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscriptions: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/package",
        };
      },
    }),
  }),
});

export const { useGetAllSubscriptionsQuery } = subscriptionApi;
