import api from "../api/baseApi";

interface Blog {
  _id: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  image: string;
  createdAt?: string;
}

interface Banner {
  _id: string;
  image: string;
}

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogs: builder.query<{ data: Blog[] }, void>({
      query: () => {
        return {
          method: "GET",
          url: "/blog",
        };
      },
    }),
    getBlogById: builder.query<
      { data: { blogDetails: Blog; relatedBlogs: Blog[] } },
      string
    >({
      query: (id) => {
        return {
          method: "GET",
          url: `/blog/${id}`,
        };
      },
    }),

    // Banner
    getAllBanners: builder.query<{ data: Banner[] }, void>({
      query: () => {
        return {
          method: "GET",
          url: "/banner",
        };
      },
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useGetAllBannersQuery,
} = blogApi;
