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

    getCarsByBrandId: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/car/by-brand/${id}`,
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

    addCarsBulk: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/bulk/upload",
          body: data,
        };
      },
    }),

    getMyAddedCars: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/car/self-added",
        };
      },
    }),

    updateCar: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/car/${id}`,
          body: data,
        };
      },
    }),

    getFilteredCars: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: `/car/filter`,
          params: data,
        };
      },
    }),

    applyTestDrive: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/reservation`,
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetCarByIdQuery,
  useAddCarMutation,
  useGetCarsByBrandIdQuery,
  useAddCarsBulkMutation,
  useGetMyAddedCarsQuery,
  useUpdateCarMutation,
  useGetFilteredCarsQuery,
  useApplyTestDriveMutation,
} = carApi;
