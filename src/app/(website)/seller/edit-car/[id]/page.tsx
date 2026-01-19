import EditCarPage from "@/components/website/editCar/EditCarPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <EditCarPage id={id} />;
};

export default Page;
