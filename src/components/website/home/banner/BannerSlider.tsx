"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import image1 from "@/assets/bannerSlider1.png";
import image2 from "@/assets/bannerSlider2.png";
import image3 from "@/assets/bannerSlider3.png";
import image4 from "@/assets/bannerSlider4.png";
import image5 from "@/assets/bannerSlider5.png";
import Image from "next/image";
import Container from "@/components/ui/container";

const bannerImages = [image1, image2, image3, image4, image5];

const BannerSlider = () => {
  return (
    <div className="bg-[#F9FAFB] ">
      <Container>
        <Swiper
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 12000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper rounded-b-xl"
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index} className="rounded-b-xl">
              <div className="relative w-full h-[700px] rounded-b-xl">
                <Image
                  src={image}
                  alt={`Banner ${index}`}
                  width={75751920}
                  height={67571080}
                  className="w-full h-full object-cover rounded-b-xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default BannerSlider;
