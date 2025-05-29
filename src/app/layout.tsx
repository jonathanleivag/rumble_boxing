import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Montserrat } from "next/font/google";
import "./globals.css";
import BodyLayoutComponent from "@/components/layouts/body.layout.component";
import { connectToMongoDB } from "@/lib/mongoose";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bebas-neue",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Rumble Boxing Club",
  description: "Entrena como un campeón en el mejor club de boxeo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${oswald.variable} ${montserrat.variable}`}
    >
      <BodyLayoutComponent>{children}</BodyLayoutComponent>
    </html>
  );
}
