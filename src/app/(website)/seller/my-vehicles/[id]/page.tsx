import MyCarsDetailsPage from "@/components/website/profile/sections/myCarsDetails/MyCarsDetailsPage";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div>
      <MyCarsDetailsPage id={id} />
    </div>
  );
};

export default page;
