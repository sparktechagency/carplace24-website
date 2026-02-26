import BlogDetailsPage from "@/components/website/blogs/BlogDetailsPage";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <BlogDetailsPage id={id} />
    </div>
  );
};

export default page;
