import Container from "@/components/ui/container";
import { div } from "framer-motion/client";
import Image from "next/image";

const AboutMainPage = () => {
  return (
    <div>
      <Container>
        <div>
          <h1>About Us</h1>
          <div className="flex justify-between items-center w-full py-20 border-dashed border-b-2 ">
            <div className="w-[50%]">
              <h1 className="text-4xl font-bold mb-5">
                Our <span className="text-[#007AFF]">Story</span>
              </h1>
              <p className="w-[70%]">
                Think of us as your development talent pool on tap! We find the
                perfect developers, from juniors to full-stack pros, who
                integrate smoothly into your team. We support them every step of
                the way, so you can say goodbye to roadblocks & hello to
                seamless deployment.
              </p>
              <button className="bg-[#007AFF] text-white px-5 py-2 rounded-md mt-5">
                Read More
              </button>
            </div>
            <div className="w-[50%]">
              <Image
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop"
                alt="About Us"
                width={6546500}
                height={5464500}
                className="md:w-[80%] rounded-2xl"
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full py-20 border-dashed border-b-2 ">
            <div className="w-[50%]">
              <Image
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop"
                alt="About Us"
                width={6546500}
                height={5464500}
                className="md:w-[80%] rounded-2xl"
              />
            </div>
            <div className="w-[50%]">
              <h1 className="text-4xl font-bold mb-5">
                Our <span className="text-[#007AFF]">Vision</span>
              </h1>
              <p className="w-[70%]">
                Think of us as your development talent pool on tap! We find the
                perfect developers, from juniors to full-stack pros, who
                integrate smoothly into your team. We support them every step of
                the way, so you can say goodbye to roadblocks & hello to
                seamless deployment.
              </p>
              <button className="bg-[#007AFF] text-white px-5 py-2 rounded-md mt-5">
                Read More
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center w-full py-20 ">
            <div className="w-[50%]">
              <h1 className="text-4xl font-bold mb-5">
                Our <span className="text-[#007AFF]">Goal</span>
              </h1>
              <p className="w-[70%]">
                Think of us as your development talent pool on tap! We find the
                perfect developers, from juniors to full-stack pros, who
                integrate smoothly into your team. We support them every step of
                the way, so you can say goodbye to roadblocks & hello to
                seamless deployment.
              </p>
              <button className="bg-[#007AFF] text-white px-5 py-2 rounded-md mt-5">
                Read More
              </button>
            </div>
            <div className="w-[50%]">
              <Image
                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop"
                alt="About Us"
                width={6546500}
                height={5464500}
                className="md:w-[80%] rounded-2xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutMainPage;
