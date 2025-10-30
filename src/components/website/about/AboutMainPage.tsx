import Container from "@/components/ui/container";
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
          <div className="flex justify-between items-center w-full py-20 border-dashed border-b-2 ">
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
          <div className="bg-gray-50 rounded-lg p-8 my-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-2xl font-bold">
                  &quot;Highly recommend, efficient and very productive.&quot;
                </h2>
                <p className="text-gray-600">
                  Raen AI is a game-changer! We needed help navigating the world
                  of AI for our business, and their team was incredibly
                  knowledgeable and supportive. They explained everything in
                  simple terms and helped us develop a solution that exceeded
                  our expectations. We&apos;re now seeing a significant increase
                  in efficiency and productivity, all thanks to Raen AI.
                </p>
                <div className="mt-4">
                  <p className="font-semibold">Mr. John Wick</p>
                  <p className="text-gray-500">The Tarasov Mob</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="rounded-lg overflow-hidden relative aspect-video">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
                  >
                    <source src="/heroBgVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutMainPage;
