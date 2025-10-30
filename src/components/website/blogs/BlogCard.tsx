import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from './blogData';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image 
          src={blog.imageUrl} 
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-blue-600">{blog.category}</span>
          <span className="text-xs text-gray-500">{blog.readTime}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{blog.date}</span>
          <Link href={`/blogs/${blog.id}`} className="text-blue-600 font-medium hover:underline">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;