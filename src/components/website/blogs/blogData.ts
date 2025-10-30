export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  fullContent?: {
    introduction: string;
    sections: {
      title: string;
      content: string;
      imageUrl?: string;
    }[];
    conclusion: string;
  };
  author: string;
  authorImage?: string;
  authorBio?: string;
  date: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Electric Cars to Watch in 2023",
    excerpt:
      "Discover the most exciting electric vehicles hitting the market this year with cutting-edge technology and impressive range.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    fullContent: {
      introduction: "The electric vehicle market is experiencing unprecedented growth in 2023, with major manufacturers releasing innovative models that combine cutting-edge technology, impressive range, and stylish designs. In this article, we explore the top 10 electric cars that are set to make a significant impact this year.",
      sections: [
        {
          title: "1. Tesla Model S Plaid",
          content: "The Tesla Model S Plaid continues to dominate the electric vehicle market with its unmatched performance. With a 0-60 mph time of just 1.99 seconds, it's currently the quickest production car in the world. The Plaid offers an EPA-estimated range of 396 miles and a top speed of 200 mph when equipped with the proper wheels and tires. Its updated interior features a new horizontal touchscreen and an airplane-style steering yoke.",
          imageUrl: "https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070&auto=format&fit=crop"
        },
        {
          title: "2. Lucid Air Dream Edition",
          content: "The Lucid Air Dream Edition has set new standards for electric vehicle range and efficiency. With an EPA-estimated range of up to 520 miles on a single charge, it currently offers the longest range of any electric vehicle on the market. The Dream Edition Performance variant delivers 1,111 horsepower, allowing it to accelerate from 0-60 mph in just 2.5 seconds. Its luxurious interior and advanced technology make it a compelling alternative to traditional luxury sedans.",
          imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2071&auto=format&fit=crop"
        },
        {
          title: "3. Rivian R1T",
          content: "The Rivian R1T is the first electric pickup truck to hit the market, offering a unique blend of performance, utility, and adventure-ready features. With up to 835 horsepower from its quad-motor setup, the R1T can accelerate from 0-60 mph in just 3 seconds. It offers an EPA-estimated range of 314 miles and can tow up to 11,000 pounds. Innovative features include a gear tunnel that runs the width of the vehicle, a built-in air compressor, and an optional camp kitchen.",
          imageUrl: "https://images.unsplash.com/photo-1652509525608-6b44097ea5a7?q=80&w=2070&auto=format&fit=crop"
        }
      ],
      conclusion: "The electric vehicle market is more exciting than ever in 2023, with options ranging from practical commuters to high-performance sports cars and capable trucks. As charging infrastructure continues to expand and battery technology improves, electric vehicles are becoming increasingly viable options for a wider range of consumers. Whether you're looking for maximum range, cutting-edge technology, or impressive performance, there's likely an electric vehicle that meets your needs hitting the market this year."
    },
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    authorBio: "Jane Smith is an automotive journalist specializing in electric vehicles and sustainable transportation. With over a decade of experience in the industry, she has test-driven hundreds of vehicles and is passionate about the transition to cleaner mobility solutions.",
    author: "Jane Smith",
    date: "May 15, 2023",
    category: "Electric Vehicles",
    tags: ["electric", "sustainable", "technology"],
    imageUrl:
      "https://torque-gt.co.uk/cdn/shop/files/DSC07272-Enhanced-NR-Edit.jpg?v=1739290779&width=1400",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "How to Maintain Your Car During Winter",
    excerpt:
      "Essential tips to keep your vehicle running smoothly during the cold winter months and avoid common problems.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Michael Johnson",
    date: "December 3, 2023",
    category: "Maintenance",
    tags: ["winter", "maintenance", "tips"],
    imageUrl:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1964&auto=format&fit=crop",
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "The Future of Autonomous Driving",
    excerpt:
      "Exploring the latest advancements in self-driving technology and what it means for the future of transportation.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Alex Chen",
    date: "August 21, 2023",
    category: "Technology",
    tags: ["autonomous", "AI", "future"],
    imageUrl:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
    readTime: "10 min read",
  },
  {
    id: "4",
    title: "Best Family SUVs of 2023",
    excerpt:
      "A comprehensive guide to the most reliable and spacious SUVs perfect for families with growing needs.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Sarah Williams",
    date: "July 7, 2023",
    category: "SUVs",
    tags: ["family", "SUV", "safety"],
    imageUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
    readTime: "6 min read",
  },
  {
    id: "5",
    title: "Hybrid vs Electric: Which is Right for You?",
    excerpt:
      "Breaking down the differences between hybrid and fully electric vehicles to help you make an informed decision.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "David Lee",
    date: "September 12, 2023",
    category: "Comparison",
    tags: ["hybrid", "electric", "comparison"],
    imageUrl:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    readTime: "8 min read",
  },
  {
    id: "6",
    title: "The Rise of Luxury Electric Vehicles",
    excerpt:
      "How premium brands are embracing electric technology and redefining luxury in the automotive industry.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Emily Parker",
    date: "October 30, 2023",
    category: "Luxury",
    tags: ["luxury", "electric", "premium"],
    imageUrl:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2071&auto=format&fit=crop",
    readTime: "7 min read",
  },
  {
    id: "7",
    title: "Essential Car Safety Features to Look For",
    excerpt:
      "A guide to the most important safety technologies that every modern vehicle should have.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Robert Thompson",
    date: "June 18, 2023",
    category: "Safety",
    tags: ["safety", "features", "technology"],
    imageUrl:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1964&auto=format&fit=crop",
    readTime: "5 min read",
  },
  {
    id: "8",
    title: "The Complete Guide to Car Financing",
    excerpt:
      "Understanding your options for financing a new or used vehicle and getting the best deal possible.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Jennifer Adams",
    date: "April 5, 2023",
    category: "Finance",
    tags: ["financing", "loans", "budget"],
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    readTime: "9 min read",
  },
];
