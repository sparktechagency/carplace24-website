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

    createSubscriptionCheckout: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/payment/create-subscription-checkout",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllSubscriptionsQuery,
  useCreateSubscriptionCheckoutMutation,
} = subscriptionApi;
