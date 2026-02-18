import SingleVehiclesMain from "@/components/website/vehicles/singleVehicles/SingleVehiclesMain";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <SingleVehiclesMain params={{ id }} />
    </div>
  );
};

export default page;
