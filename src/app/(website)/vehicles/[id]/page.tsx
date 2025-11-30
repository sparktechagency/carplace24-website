import SingleVehiclesMain from "@/components/website/vehicles/singleVehicles/SingleVehiclesMain";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <SingleVehiclesMain params={{ id: params.id }} />
    </div>
  );
};

export default page;
