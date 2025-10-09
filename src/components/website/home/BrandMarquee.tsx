import jeepLogo from "@/assets/JeepLogo.png";
import bmwLogo from "@/assets/bmwLogo.png";
import audiLogo from "@/assets/audiLogo.png";
import ferrariLogo from "@/assets/ferraryLogo.png";
import lamborghiniLogo from "@/assets/lamborghiniLogo.png";
import maseratiLogo from "@/assets/maseratiLogo.png";
import porscheLogo from "@/assets/porscheLogo.png";
import hondaLogo from "@/assets/hondaLogo.png";
import knLogo from "@/assets/knLogo.png";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Container from "@/components/ui/container";

// Array of brand logos for easier mapping
const brandLogos = [
  { src: jeepLogo, alt: "Jeep" },
  { src: bmwLogo, alt: "BMW" },
  { src: audiLogo, alt: "Audi" },
  { src: ferrariLogo, alt: "Ferrari" },
  { src: lamborghiniLogo, alt: "Lamborghini" },
  { src: maseratiLogo, alt: "Maserati" },
  { src: porscheLogo, alt: "Porsche" },
  { src: hondaLogo, alt: "Honda" },
  { src: knLogo, alt: "KN" },
];

const BrandMarquee = () => {
  return (
    <div className="py-12 bg-gray-50">
      <Container>
        {" "}
        <h2 className="text-2xl font-semibold mb-8">Popular Brands</h2>
      </Container>
      <Marquee gradient={false} speed={40} pauseOnHover={true} className="py-4">
        {brandLogos.map((logo, index) => (
          <div key={index} className="mx-5 md:mx-20">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={400}
              height={400}
              className="h-32 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
