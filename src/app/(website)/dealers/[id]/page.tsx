import DealerDetailsMain from "@/components/website/dealers/DealerDetailes/DealerDetailsMain";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <DealerDetailsMain id={id} />
    </div>
  );
};

export default page;
