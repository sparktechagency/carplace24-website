"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import image1 from "@/assets/bannerImg1.jpg";
import image2 from "@/assets/bannerImg2.jpg";
import image3 from "@/assets/bannerImg3.jpg";
import Image from "next/image";

const bannerImages = [image1, image2, image3];

const BannerSlider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[800px]">
              <Image
                src={image}
                alt={`Banner ${index}`}
                width={75751920}
                height={67571080}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
