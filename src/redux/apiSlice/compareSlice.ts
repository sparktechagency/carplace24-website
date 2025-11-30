import api from "../api/baseApi";

const compareApi = api.injectEndpoints({
  endpoints: (builder) => ({
    compareACar: builder.mutation({
      query: (data) => ({
        url: "/car/compare",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Compare"],
    }),

    getCompareCars: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/car/compare`,
        };
      },
      providesTags: ["Compare"],
    }),

    deleteCompareCar: builder.mutation({
      query: (id) => ({
        url: `/car/compare/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Compare"],
    }),

    //bookmark api
    toggleBookmarkCar: builder.mutation({
      query: (data) => ({
        url: "/bookmark",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookmark"],
    }),

    getBookmarkCars: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/bookmark`,
        };
      },
      providesTags: ["Bookmark"],
    }),

    deleteBookmarkCar: builder.mutation({
      query: (id) => ({
        url: `/bookmark/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmark"],
    }),
  }),
});

export const {
  useCompareACarMutation,
  useGetCompareCarsQuery,
  useDeleteCompareCarMutation,

  useToggleBookmarkCarMutation,
  useGetBookmarkCarsQuery,
  useDeleteBookmarkCarMutation,
} = compareApi;
