import api from "../api/baseApi";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    otpVerify: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/verify-email",
          body: data,
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/email-login",
          body: data,
        };
      },
      transformResponse: (data: any) => {
        return data;
      },
      transformErrorResponse: (baseQueryReturnValue: any) => {
        const { data } = baseQueryReturnValue;
        const { message } = data || {};
        return message || "An error occurred";
      },
    }),

    register: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/user",
          body: data,
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/forgot-password",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/reset-password",
          body: data,
          headers: {
            Authorization: localStorage.getItem("Authorization") || "",
          },
        };
      },
    }),

    changePassword: builder.mutation({
      query: (value) => {
        return {
          method: "POST",
          url: "/auth/change-password",
          body: value,
        };
      },
      invalidatesTags: ["AdminData"],
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        const token = localStorage.getItem("token");
        return {
          method: "POST",
          url: "/auth/update-profile",
          body: data,
          headers: {
            Authorization: token ? `Bearer ${JSON.parse(token)}` : "",
          },
        };
      },
      invalidatesTags: ["AdminData"],
    }),

    profile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/profile",
        };
      },
      providesTags: ["AdminData"],
    }),

    userUpdate: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/user",
          body: data,
        };
      },
    }),

    fetchAdminProfile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/profile",
        };
      },
      providesTags: ["AdminData"],
    }),

    updateAdminProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/user",
          body: data,
        };
      },
      invalidatesTags: ["AdminData"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useOtpVerifyMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useUserUpdateMutation,
  useFetchAdminProfileQuery,
  useUpdateAdminProfileMutation,
} = authApi;
