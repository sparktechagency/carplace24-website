"use client";

import Container from "@/components/ui/container";

type CarItem = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  imageSrc: string;
};

const items: CarItem[] = [
  {
    id: "1",
    title: "KIA Sportage 1.6T PHEV",
    subtitle: "Sportage 1.6T/SUV/Jeep/Audi",
    price: "$15,000",
    originalPrice: "$16,000",
    imageSrc:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "KIA Sportage 1.6T PHEV",
    subtitle: "Sportage 1.6T/SUV/Jeep/Audi",
    price: "$15,000",
    originalPrice: "$16,000",
    imageSrc:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "KIA Sportage 1.6T PHEV",
    subtitle: "Sportage 1.6T/SUV/Jeep/Audi",
    price: "$15,000",
    originalPrice: "$16,000",
    imageSrc:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
  },
];

const RelatedCars = () => {
  return (
    <section className="my-10">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">
          Vehicles from this seller
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((car) => (
            <article
              key={car.id}
              className="rounded-xl border bg-white shadow-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  src={car.imageSrc}
                  alt={car.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 border flex items-center justify-center">
                  <span className="text-green-600 text-xl">❤</span>
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-1">
                  Car Service • Dealer
                </div>
                <h3 className="font-semibold text-lg">{car.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{car.subtitle}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-base font-semibold">{car.price}</span>
                  {car.originalPrice && (
                    <span className="text-sm line-through text-red-500">
                      {car.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedCars;
