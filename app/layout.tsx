import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Information Management",
  description: "Final Project Front-end DevInit#1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="https://avatars.githubusercontent.com/u/144009672"
        />
      </head>
      <body
        className={`${inter.className} flex flex-col h-screen bg-white dark:bg-gray-900`}
      >
        <Navbar />
        <div className="flex justify-center flex-1 my-2 px-5 lg:px-7">
          <div className="container pt-4 pb-5 h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
