import Container from "@/components/ui/container";

const Hero = () => {
  return (
    <div className="relative h-[750px]">
      <video
        src="/heroBgVid.mp4"
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/80" />
      <Container>
        <div className="relative z-10 flex flex-col text-white items-center justify-center h-[650px]">
          <h1 className="text-3xl md:text-5xl font-bold md:w-[40%] text-center">
            The <span className="text-primary">best way</span> to find your
            vehicles
          </h1>
          <p className="text-xl md:text-2xl mt-5 text-center">
            Discover, Compare, Drive Away with {""}
            <span className="text-green-700 font-semibold">100,500</span> {""}
            Vehicles
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
