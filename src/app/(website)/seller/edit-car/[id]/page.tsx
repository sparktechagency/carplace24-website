import EditCarPage from "@/components/website/editCar/EditCarPage";

const Page = ({ params }: { params: { id: string } }) => {
  return <EditCarPage id={params.id} />;
};

export default Page;
