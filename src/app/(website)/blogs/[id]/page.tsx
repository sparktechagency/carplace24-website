import BlogDetailsPage from "@/components/website/blogs/BlogDetailsPage";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <BlogDetailsPage id={params.id} />
    </div>
  );
};

export default page;
