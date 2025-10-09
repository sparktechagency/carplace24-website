import sellQuicklyImage from "@/assets/sellQuicklyImg.png";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";

const SellQuicklyBanner = () => {
  return (
    <div className=" bg-[#0d1d49]">
      <Container>
        <div className="w-full relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left content */}
            <div className="w-full md:w-1/2 py-12 md:py-16 pr-0 md:pr-8 z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sell your car to a dealer quickly and safely
              </h2>
              <p className="text-green-400 mb-8">
                Turn your car into cash in just a few easy steps.
              </p>
              <Link
                href="#"
                className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-navy-900 font-medium py-3 px-6 rounded-md transition-colors"
              >
                Sell Now <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Right image */}
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] relative">
              <Image
                src={sellQuicklyImage}
                alt="Sell your car quickly"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SellQuicklyBanner;
