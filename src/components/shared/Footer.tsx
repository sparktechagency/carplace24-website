import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logoWhite from "@/assets/Carplace24-Logo-white1.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src={logoWhite}
                alt="Carplace24 Logo"
                width={150}
                height={50}
                className="mb-5 w-40"
              />
            </Link>
            <p className="text-sm text-gray-400">
              Fusce quis tellus nulla. Donec sodales mauris eget pellentesque
              hendrerit. Donec molestie non urna sit amet aliquet. Curabitur sit
              amet est nec nulla varius fermentum.
            </p>
            <Link
              href="#"
              className="text-blue-400 flex items-center gap-1 text-sm"
            >
              <span>Learn more</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-external-link"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <Link href="/about" className="block hover:text-blue-400">
                About US
              </Link>
              <Link href="/blogs" className="block hover:text-blue-400">
                Blogs
              </Link>
              <Link href="/contact" className="block hover:text-blue-400">
                Contact
              </Link>
            </div>
            <div className="space-y-4">
              <Link href="/terms" className="block hover:text-blue-400">
                Terms & Conditions
              </Link>
              <Link href="/policy" className="block hover:text-blue-400">
                Policy
              </Link>
              <Link href="/faq" className="block hover:text-blue-400">
                FAQ
              </Link>
            </div>
          </div>

          {/* Subscribe and Social */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-sm font-medium">
                Subscribe To Our Email Alerts
              </h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-md w-full text-white bg-gray-800 focus:outline-none"
                />
                <button className="bg-primary hover:bg-blue-600 cursor-pointer px-6 py-2 rounded-r-md">
                  Send
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium">Follow us</h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="bg-blue-600 p-2 rounded-full hover:bg-blue-700"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="#"
                  className="bg-pink-600 p-2 rounded-full hover:bg-pink-700"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="#"
                  className="bg-blue-500 p-2 rounded-full hover:bg-blue-600"
                >
                  <FaLinkedinIn />
                </Link>
                <Link
                  href="#"
                  className="bg-red-600 p-2 rounded-full hover:bg-red-700"
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © Copyright UX/UI 2024 Team Md. Asadujjaman Mahfuz
        </div>
      </div>
    </footer>
  );
};

export default Footer;
