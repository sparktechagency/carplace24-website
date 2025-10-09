import Container from "@/components/ui/container";
import nearestDealersImg from "@/assets/nearestDealerImg.png";
import nearestDealersArrow from "@/assets/nearestDealerArrow.png";
import Image from "next/image";
import { Search } from "lucide-react";

const FindNearestDealers = () => {
  return (
    <div className="py-16 bg-white">
      <Container className="flex flex-col md:flex-row items-center gap-10 w-full">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <Image
              src={nearestDealersImg}
              alt="Find nearest dealers"
              className="w-[95%] h-auto"
            />
            <Image
              src={nearestDealersArrow}
              alt="Arrow"
              className="hidden md:block absolute bottom-5 -right-15 w-32 h-auto"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-4xl font-semibold text-gray-800 mb-4">
            Find you nearest Dealers
          </h2>
          <p className="text-gray-600 mb-8">
            First of all, take a look at what&apos;s around the corner from you?
          </p>

          {/* Search button */}
          <div className="w-fit">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center gap-2 transition-colors">
              <Search className="w-5 h-5" />
              Find dealers
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FindNearestDealers;
