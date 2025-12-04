import api from "../api/baseApi";

const brandAndModelSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/brand",
        };
      },
    }),

    // models

    getAllModels: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/models",
        };
      },
    }),

    getModelByBrand: builder.query({
      query: (brandId: string) => {
        return {
          method: "GET",
          url: `/brand/models-by-brand/${brandId}`,
        };
      },
    }),
  }),
});

export const {
  useGetAllBrandsQuery,

  //models
  useGetAllModelsQuery,
  useGetModelByBrandQuery,
} = brandAndModelSlice;
