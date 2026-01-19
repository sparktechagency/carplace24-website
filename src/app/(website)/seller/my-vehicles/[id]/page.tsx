import MyCarsDetailsPage from "@/components/website/profile/sections/myCarsDetails/MyCarsDetailsPage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div>
      <MyCarsDetailsPage id={id} />
    </div>
  );
};

export default page;
