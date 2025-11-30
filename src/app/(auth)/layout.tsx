import Image from "next/image";
import logo from "@/assets/Carplace24Logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-br from-[#f4f8ff] via-white to-[#e9f3ff]">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={logo}
            width={5677128}
            height={7856764}
            alt="Carplace24 logo"
            className="w-[400px]"
          />
          <p className="text-sm text-muted-foreground">Welcome to Carplace24</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
