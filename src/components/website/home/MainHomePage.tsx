import BlogSectionHome from "./BlogSectionHome";
import BrandMarquee from "./BrandMarquee";
import CarsWithFilter from "./carsWithFilter/CarsWithFilter";
import FindNearestDealers from "./FindNearestDealers";
import Hero from "./Hero";
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
    </div>
  );
};

export default MainHomePage;
