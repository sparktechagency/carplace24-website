"use client";

import { useState } from "react";
import { BlogPost } from "./blogData";
import BlogCard from "./BlogCard";
import { useGetAllBlogsQuery } from "@/redux/apiSlice/blogSlice";
import { imageUrl } from "@/redux/api/baseApi";

const BlogMainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data } = useGetAllBlogsQuery();
  const apiBlogs = (data?.data || []) as Array<{
    _id: string;
    title: string;
    type: string;
    description: string;
    tags?: string[];
    image: string;
    createdAt?: string;
  }>;

  const blogs: BlogPost[] = apiBlogs.map((b) => ({
    id: b._id,
    title: b.title,
    excerpt: b.description,
    content: b.description,
    author: "",
    date: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "",
    category: b.type || "",
    tags: b.tags || [],
    imageUrl:
      typeof b.image === "string" && b.image.startsWith("http")
        ? b.image
        : `${imageUrl}/${b.image}`,
    readTime: "5 min read",
  }));

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((blog) => blog.category))).filter(Boolean),
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "All" ||
      blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest news, tips, and insights about the
          automotive industry
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-8">
        {/* Search bar */}
        <div className="mb-4 md:mb-0 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category filter */}
        <div className="w-full md:w-1/4">
          <select
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blog grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-semibold">No blogs found</h3>
            <p className="text-gray-600 mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogMainPage;
