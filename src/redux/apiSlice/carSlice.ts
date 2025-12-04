import api from "../api/baseApi";

const carApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/car",
        };
      },
    }),

    getCarById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/car/${id}`,
        };
      },
    }),

    addCar: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/car",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetAllCarsQuery, useGetCarByIdQuery, useAddCarMutation } =
  carApi;
