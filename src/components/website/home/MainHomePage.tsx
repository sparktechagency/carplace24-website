import FindNearestDealers from "@/components/shared/FindNearestDealers";
import BlogSectionHome from "./BlogSectionHome";
import BrandMarquee from "./BrandMarquee";
import CarsWithFilter from "./carsWithFilter/CarsWithFilter";
import Faq from "./Faq";
import Hero from "./Hero";
import ReviewSection from "./reviewSection/ReviewSection";
import SellQuicklyBanner from "./SellQuicklyBanner";

const MainHomePage = () => {
  return (
    <div>
      <Hero />
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
