import FindNearestDealers from "@/components/shared/FindNearestDealers";
import BlogSectionHome from "./BlogSectionHome";
import BrandMarquee from "./BrandMarquee";
import CarsWithFilter from "./carsWithFilter/CarsWithFilter";
import Faq from "./Faq";
import ReviewSection from "./reviewSection/ReviewSection";
import SellQuicklyBanner from "./SellQuicklyBanner";
import BannerSlider from "./banner/BannerSlider";

const MainHomePage = () => {
  return (
    <div>
      <BannerSlider />
      <CarsWithFilter />
      <FindNearestDealers />
      <BlogSectionHome />
      <SellQuicklyBanner />
      <BrandMarquee />
      <Faq />
      <ReviewSection />
    </div>
  );
};

export default MainHomePage;
