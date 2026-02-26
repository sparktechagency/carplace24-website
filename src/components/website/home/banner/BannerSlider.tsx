"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Image from "next/image";
import Container from "@/components/ui/container";
import { useGetAllBannersQuery } from "@/redux/apiSlice/blogSlice";
import CarLoader from "@/components/ui/loader/CarLoader";
import { getImageUrl } from "@/lib/getImageUrl";

const BannerSlider = () => {
  const { data: bannerData, isLoading } = useGetAllBannersQuery();

  if (isLoading) {
    return <CarLoader />;
  }

  const bannerImages = bannerData?.data?.map((banner) => banner?.image);

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
          {bannerImages?.map((image, index) => (
            <SwiperSlide key={index} className="rounded-b-xl">
              <div className="relative w-full md:h-[700px] h-[600px] rounded-b-xl">
                <Image
                  src={getImageUrl(image)}
                  alt={`Banner ${index}`}
                  width={75751920}
                  height={67571080}
                  className="w-full md:h-full object-contain rounded-b-xl"
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
