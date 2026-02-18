import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

const API_BASE_URL = "http://10.10.7.72:5000/api/v1";
const IMAGE_BASE_URL = "http://10.10.7.72:5000";
// const API_BASE_URL = "http://83.228.197.97:5000/api/v1";
// const IMAGE_BASE_URL = "http://83.228.197.97:5000";
// const API_BASE_URL = "https://api.carplace24.ch/api/v1";
// const IMAGE_BASE_URL = "https://api.carplace24.ch";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers) => {
    // Get access token from cookies
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split(";");
      const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("accessToken="),
      );

      if (accessTokenCookie) {
        const accessToken = accessTokenCookie
          .trim()
          .substring("accessToken=".length);
        if (accessToken) {
          headers.set("authorization", `Bearer ${accessToken}`);
        }
      }
    }

    return headers;
  },
  credentials: "include", // This ensures cookies are sent with requests
});

const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // If 401 is encountered, perform logout and redirect
  if (result?.error?.status === 443201) {
    // Cookies are handled by the server, no need to clear them here

    // Optionally clear Redux state
    api.dispatch({ type: "auth/logout" });

    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};

const api = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: ["AdminData", "Compare", "Bookmark", "cars"],
});

export const { reducer } = api;
export default api;
export const imageUrl = IMAGE_BASE_URL;
