import api from "../api/baseApi";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

const faqApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFaq: builder.query<{ data: FaqItem[] }, void>({
      query: () => {
        return {
          method: "GET",
          url: "/faq",
        };
      },
    }),
  }),
});

export const { useGetFaqQuery } = faqApi;
