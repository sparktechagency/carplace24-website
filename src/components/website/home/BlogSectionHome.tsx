import Link from "next/link";
import Container from "@/components/ui/container";
import Image from "next/image";

// Blog data structure
const blogPosts = [
  {
    id: 1,
    title: "How much does an electric car cost?",
    description: "varius nisl ex facilisis vitae est. viverra quis laoreet",
    image:
      "https://images.unsplash.com/photo-1493454966123-fbf5a725f442?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "large",
    linkText: "Visit Now",
  },
  {
    id: 2,
    title: "How long does an electric car charge?",
    description: "varius nisl ex facilisis vitae est. viverra quis laoreet",
    image:
      "https://plus.unsplash.com/premium_photo-1694261123397-d30aafbe04d3?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "medium",
    linkText: "Visit Now",
  },
  {
    id: 3,
    title: "What do I have to consider when it comes to range?",
    description: "varius nisl ex facilisis vitae est. viverra quis laoreet",
    image:
      "https://images.unsplash.com/photo-1715372031424-b7a57e8339fe?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "small",
    linkText: "Visit Now",
  },
  {
    id: 4,
    title: "Can I change all the water at once?",
    description: "varius nisl ex facilisis vitae est. viverra quis laoreet",
    image:
      "https://images.unsplash.com/photo-1545586433-dcb96e015755?q=80&w=1242&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size: "small",
    linkText: "Visit Now",
  },
];

const BlogCard = ({ blog }: { blog: (typeof blogPosts)[0] }) => {
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
          <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3">
            {blog.description}
          </p>
          <Link
            href="#"
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
  return (
    <div className="py-8 sm:py-12 md:py-16 bg-gray-50">
      <Container>
        {/* Header with View All link */}
        <div className="flex justify-between items-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold">You may like</h2>
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
            <BlogCard blog={blogPosts[0]} />
          </div>

          {/* Medium card - full width on mobile, 2x1 on larger screens */}
          <div className="sm:col-span-2">
            <BlogCard blog={blogPosts[1]} />
          </div>

          {/* Small cards - stack on mobile, side by side on larger screens */}
          <div className="lg:col-span-1">
            <BlogCard blog={blogPosts[2]} />
          </div>
          <div className="lg:col-span-1">
            <BlogCard blog={blogPosts[3]} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogSectionHome;
