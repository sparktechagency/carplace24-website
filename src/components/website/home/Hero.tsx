import Container from "@/components/ui/container";
import heroBg from "@/assets/heroBg.png";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${heroBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-black/60">
        <Container>
          <div className="flex flex-col text-white items-center justify-center h-[750px]">
            <h1 className="text-5xl font-bold w-[40%] text-center">
              The <span className="text-primary">best way</span> to find your
              vehicles
            </h1>
            <p className="text-2xl mt-5 text-center">
              Discover, Compare, Drive Away with{" "}
              <span className="text-green-700 font-semibold">100,500</span>{" "}
              Vehicles
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Hero;
