import api from "../api/baseApi";

const dealerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllDealers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/all-dealers",
        };
      },
    }),

    getDealerById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/cars-by-dealer/${id}`,
        };
      },
    }),
  }),
});

export const { useGetAllDealersQuery, useGetDealerByIdQuery } = dealerApi;
