import Image from "next/image";

const blogData = {
  id: "1",
  title: "The Ultimate Guide to House-Sharing Concierge Services",
  date: "June 15, 2023",
  author: "Sarah Johnson",
  authorImage:
    "https://blog.texasbar.com/files/2013/04/MaryGraceRuden_smaller1.jpg",
  category: "Property Management",
  readTime: "8 min read",
  tags: ["house-sharing", "concierge", "property management", "rental"],
  imageUrl:
    "https://dvladigital.blog.gov.uk/wp-content/uploads/sites/7/2023/03/DD-Blog-Set-up-a-Direct-Debit-to-tax-your-vehicle-today-1-1024x510.jpg",
  content: {
    introduction:
      "House-sharing concierge services have become increasingly popular among property owners who want to maximize their rental income while maintaining the peace of mind of their tenants. These services offer a range of features and benefits that make them a valuable addition to any rental property.",
    body: "A house-sharing concierge is a dedicated professional who works closely with property owners to manage their rental properties. They handle tasks such as tenant screening, lease management, utility bills, and even provide 24/7 support to their tenants. By entrusting your property to a house-sharing concierge, you can focus on what matters most – your tenants.",
    conclusion:
      "House-sharing concierge services offer a valuable solution for property owners who want to maximize their rental income without the hassle of day-to-day management. By entrusting your property to experienced professionals, you can enjoy the benefits of house-sharing while maintaining your peace of mind.",
  },
};

const relatedPosts = [
  {
    id: "2",
    title: "Maximizing Rental Income: Tips and Strategies",
    excerpt:
      "Learn how to optimize your rental property for maximum income potential.",
    imageUrl:
      "https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?q=80&w=2070&auto=format&fit=crop",
    category: "Property Management",
  },
  {
    id: "3",
    title: "Smart Home Technology for Rental Properties",
    excerpt:
      "Discover the latest smart home technologies that can enhance your rental property.",
    imageUrl:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2071&auto=format&fit=crop",
    category: "Property Management",
  },
  {
    id: "4",
    title: "Navigating Local Regulations for House-Sharing",
    excerpt:
      "A comprehensive guide to understanding and complying with local regulations.",
    imageUrl:
      "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop",
    category: "Property Management",
  },
];

const BlogDetailsPage = ({ id }: { id: string }) => {
  console.log(id);
  const blog = blogData;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Cover Image */}
      <div className="w-full h-[400px] relative mb-8 rounded-2xl overflow-hidden">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {blog.category}
          </span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span>{blog.readTime}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex items-center gap-3">
          <Image
            src={blog.authorImage}
            alt={blog.author}
            width={40}
            height={40}
            className="rounded-full w-[40px] h-[40px] object-cover"
          />
          <p className="text-gray-700 font-medium">{blog.author}</p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="prose prose-gray max-w-none mb-12">
        <p className="text-lg text-gray-700 mb-4">
          {blog.content.introduction}
        </p>
        <p className="text-gray-700 mb-4">{blog.content.body}</p>
        <p className="text-gray-700 font-medium">{blog.content.conclusion}</p>
      </div>

      {/* Tags */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Related Posts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-xl overflow-hidden hover:shadow-md transition"
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
