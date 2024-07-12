import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/stackcontained.svg";
import { IoStarHalfOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { LuTrendingUp } from "react-icons/lu";
import { VscRepoForked } from "react-icons/vsc";
import Preview from "./Preview";

export default function Sidebar() {
  return (
    <nav className="sticky top-0 flex flex-col bg-secondary w-[280px] h-screen overflow-hidden shadow-2xl px-6 py-8">
      <div>
        <div className="flex justify-center gap-2 mb-8">
          <Image src={logo} alt="logo" width={30} height={30} />
          <p>
            stack<span className="font-bold">contained</span>
          </p>
        </div>
        <div className="mb-8">
          <Link
            href="/popular"
            className="bg-primary rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-3 mb-4"
          >
            <div className="flex item-center justify-center gap-2">
              <LuTrendingUp size={15} className="text-white" />
              <p className="text-xs text-white font-semibold">
                Popular Snippets
              </p>
            </div>
          </Link>
          <Link
            href="/favorites"
            className="bg-primary rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-3 mb-4"
          >
            <div className="flex item-center justify-center gap-2">
              <IoStarHalfOutline size={13} className="text-white" />
              <p className="text-xs text-white font-semibold">Your Favorites</p>
            </div>
          </Link>
          <Link
            href="/forked"
            className="bg-primary rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-3 mb-4"
          >
            <div className="flex item-center justify-center gap-2">
              <VscRepoForked size={15} className="text-white" />
              <p className="text-xs text-white font-semibold">
                Forked Snippets
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex item-center gap-2 mb-2">
        <BsClockHistory size={13} className="text-white/80" />
        <p className="text-xs text-white/80">Frequently Used</p>
      </div>
      <div className="overflow-y-scroll no-scrollbar mb-2">
        <Preview />
      </div>
    </nav>
  );
}
