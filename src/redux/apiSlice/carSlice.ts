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
      providesTags: ["cars"],
    }),

    getCarsByBrandId: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/car/by-brand/${id}`,
        };
      },
      providesTags: ["cars"],
    }),

    getCarById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/car/${id}`,
        };
      },
      providesTags: ["cars"],
    }),

    addCar: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/car",
          body: data,
        };
      },
      invalidatesTags: ["cars"],
    }),

    addCarsBulk: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/bulk/upload",
          body: data,
        };
      },
      invalidatesTags: ["cars"],
    }),

    getMyAddedCars: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/car/self-added",
        };
      },
      providesTags: ["cars"],
    }),

    updateCar: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PUT",
          url: `/car/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["cars"],
    }),

    deleteCar: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/car/permanent/${id}`,
        };
      },
      invalidatesTags: ["cars"],
    }),

    getFilteredCars: builder.query({
      query: (data) => {
        return {
          method: "GET",
          url: `/car/filter`,
          params: data,
        };
      },
      providesTags: ["cars"],
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
  useDeleteCarMutation,
  useUpdateCarMutation,
  useGetFilteredCarsQuery,
  useApplyTestDriveMutation,
} = carApi;
