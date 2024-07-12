import { Comfortaa } from "next/font/google";
import Navbar from "./Sidebar";

const comfortaa = Comfortaa({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${comfortaa.className} text-white`}>{children}</main>
  );
}
