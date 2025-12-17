import DealerDetailsMain from "@/components/website/dealers/DealerDetailes/DealerDetailsMain";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <DealerDetailsMain id={params.id} />
    </div>
  );
};

export default page;
