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
  }),
});

export const { useGetAllBlogsQuery, useGetBlogByIdQuery } = blogApi;
