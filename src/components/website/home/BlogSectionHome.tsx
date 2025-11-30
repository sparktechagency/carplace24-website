"use client";

import Link from "next/link";
import Container from "@/components/ui/container";
import { useGetAllBlogsQuery } from "@/redux/apiSlice/blogSlice";
import { imageUrl } from "@/redux/api/baseApi";

type BlogCardData = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  size: "large" | "medium" | "small";
  linkText: string;
};

const BlogCard = ({ blog }: { blog: BlogCardData }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg h-full`}>
      {/* Image with overlay */}
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage: `url(${blog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height:
            blog.size === "large"
              ? "700px"
              : blog.size === "medium"
              ? "342px"
              : "342px",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white z-10">
          <h3
            className={`font-semibold mb-2 ${
              blog.size === "large"
                ? "text-xl sm:text-2xl"
                : blog.size === "medium"
                ? "text-lg sm:text-xl"
                : "text-base sm:text-lg"
            }`}
          >
            {blog.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3 line-clamp-2">
            {blog.description}
          </p>
          <Link
            href={`/blogs/${blog.id}`}
            className="text-blue-300 hover:text-blue-200 text-xs sm:text-sm inline-flex items-center"
          >
            {blog.linkText} <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const BlogSectionHome = () => {
  const { data } = useGetAllBlogsQuery(undefined);
  const apiBlogs = (data?.data || []) as any[];
  const sizes: Array<"large" | "medium" | "small"> = [
    "large",
    "medium",
    "small",
    "small",
  ];

  const dynamicPosts: BlogCardData[] = apiBlogs.slice(0, 4).map((b, i) => ({
    id: b?._id || i + 1,
    title: b?.title || "",
    description: b?.description || "",
    image:
      typeof b?.image === "string" && b.image.startsWith("http")
        ? b.image
        : b?.image
        ? `${imageUrl}/${b.image}`
        : "",
    size: sizes[i],
    linkText: "Visit Now",
  }));

  const posts: BlogCardData[] = dynamicPosts.length === 4 ? dynamicPosts : [];

  return (
    <div className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <Container>
        {/* Header with View All link */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-3xl text-black font-semibold mb-4">
            Popular Blog Posts
          </h2>
          <Link
            href="#"
            className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            View All
          </Link>
        </div>

        {/* Blog grid - responsive layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large card - full width on mobile, 2x2 on larger screens */}
          <div className="sm:col-span-2 lg:row-span-2">
            {posts[0] && <BlogCard blog={posts[0]} />}
          </div>

          {/* Medium card - full width on mobile, 2x1 on larger screens */}
          <div className="sm:col-span-2">
            {posts[1] && <BlogCard blog={posts[1]} />}
          </div>

          {/* Small cards - stack on mobile, side by side on larger screens */}
          <div className="lg:col-span-1">
            {posts[2] && <BlogCard blog={posts[2]} />}
          </div>
          <div className="lg:col-span-1">
            {posts[3] && <BlogCard blog={posts[3]} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogSectionHome;
