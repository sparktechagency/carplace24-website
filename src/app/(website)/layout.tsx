import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="mt-[75px]">{children}</div>
      <Footer />
    </div>
  );
}
