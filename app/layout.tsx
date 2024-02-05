import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Navbar />
        <div className="flex justify-center flex-1 my-2 px-5 lg:px-7">
          <div className="container pt-4 pb-5 h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
