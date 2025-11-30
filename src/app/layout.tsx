import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CustomProvider from "@/provider/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Carplace24 - Find Your Vehicle",
  description: "Discover, Compare, Drive Away with 100,500 Vehicles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body
        suppressHydrationWarning
        className={`${poppins.className} ${poppins.variable} font-sans antialiased`}
      >
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
