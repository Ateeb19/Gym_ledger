import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-dm",
});

export const metadata = {
  title: "FitFlow - Gym Management Software",
  description:
    "All-in-one Gym CRM & Management Software for fitness businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
