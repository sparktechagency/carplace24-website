import Container from "@/components/ui/container";
import CarImageGallery from "@/components/website/vehicles/singleVehicles/CarImageGallery";
import { CAR_DETAILS } from "@/components/website/vehicles/singleVehicles/carData";

export default function Page() {
  return (
    <main>
      <section className="py-8">
        <Container>
          <CarImageGallery images={CAR_DETAILS.images} title={CAR_DETAILS.title} />
        </Container>
      </section>
    </main>
  );
}