"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation, Pagination } from "swiper/modules";
import Container from "@/components/ui/container";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import "swiper/css/pagination";

// Review data
const reviewsData = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "Car Enthusiast",
    rating: 5,
    review:
      "I found my dream BMW through this platform. The process was seamless from browsing to final purchase. Highly recommend to anyone looking for quality vehicles!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "June 15, 2023",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "First-time Buyer",
    rating: 4,
    review:
      "As someone who knew little about cars, this site made it easy to find something within my budget. The detailed filters helped me narrow down exactly what I needed.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "August 3, 2023",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Car Dealer",
    rating: 5,
    review:
      "From a dealer's perspective, this platform connects us with serious buyers. The listing process is straightforward and the support team is always responsive.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    date: "September 21, 2023",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Luxury Car Owner",
    rating: 5,
    review:
      "I sold my Porsche through this site and got a fair price quickly. The verification process gives both buyers and sellers peace of mind. Excellent service!",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    date: "October 12, 2023",
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Car Collector",
    rating: 4,
    review:
      "The rare car section is impressive. I've added two classic cars to my collection thanks to this platform. The detailed history reports are particularly valuable.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    date: "November 5, 2023",
  },
];

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }: { review: (typeof reviewsData)[0] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[320px] flex flex-col">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 mr-4">
          <Image
            src={review.image}
            alt={review.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{review.name}</h3>
          <p className="text-sm text-gray-600">{review.role}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <StarRating rating={review.rating} />
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>

      <p className="text-gray-700 flex-grow overflow-y-auto">{review.review}</p>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Verified Purchase
        </div>
      </div>
    </div>
  );
};

const ReviewSection = () => {
  // Create a reference to the Swiper instance
  const swiperRef = React.useRef<any>(null);

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl text-black font-semibold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of car buyers and sellers trust our platform
            for their automotive needs
          </p>
        </div>

        <div className="relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper"
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id} className="py-4">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center items-center gap-4 mt-8">
            <div
              className="cursor-pointer bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ArrowLeft />
            </div>

            {/* Pagination dots between arrows */}
            <div className="swiper-pagination custom-pagination"></div>

            <div
              className="cursor-pointer bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowRight />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ReviewSection;
