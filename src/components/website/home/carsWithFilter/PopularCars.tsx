import Container from "@/components/ui/container";
import CarCard from "./CarCard";

const CARS_DATA = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop",
    dealerLogo:
      "https://images.unsplash.com/photo-1653499676737-becf2c9562c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    dealerName: "Car Service",
    dealerType: "Dealer",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: true,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1470&auto=format&fit=crop",
    dealerLogo:
      "https://plus.unsplash.com/premium_photo-1681400569389-02b0677b0c19?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    carService: "Car Service",
    dealerName: "Dealer",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1470&auto=format&fit=crop",
    dealerLogo:
      "https://images.unsplash.com/photo-1561758993-f2cb5722934c?q=80&w=1055&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    carService: "Car Service",
    dealerName: "Dealer",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1528&auto=format&fit=crop",
    dealerLogo:
      "https://images.unsplash.com/photo-1580128483799-52b7f6cc3746?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    carService: "Car Service",
    dealerName: "Dealer",
    carName: "KIA Sportage 1.6T PHEV",
    carCategory: "Sportage 1.6T/SUV/Jeep/Audi",
    originalPrice: 15000,
    discountedPrice: 16000,
    isFavorite: false,
  },
];

const PopularCars = () => {
  return (
    <section className="py-12 bg-gray-50 pt-40">
      <Container>
        <h2 className="text-3xl font-semibold mb-8">Popular Cars</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARS_DATA.map((car) => (
            <CarCard
              key={car.id}
              image={car.image}
              dealerLogo={car.dealerLogo}
              dealerName={car.dealerName}
              dealerType={car.dealerType ?? ""}
              carName={car.carName}
              carCategory={car.carCategory}
              originalPrice={car.originalPrice}
              discountedPrice={car.discountedPrice}
              isFavorite={car.isFavorite}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PopularCars;
