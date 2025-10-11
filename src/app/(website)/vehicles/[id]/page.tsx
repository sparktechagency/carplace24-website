import SingleVehiclesMain from "@/components/website/vehicles/singleVehicles/SingleVehiclesMain";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <SingleVehiclesMain params={params} />
    </div>
  );
};

export default page;
