import { useAppContext } from "@/hooks/useAppContext";
import { FaCode } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { VscRepoForked } from "react-icons/vsc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LiaCommentSolid } from "react-icons/lia";
import { GoEye } from "react-icons/go";
import { FiCopy } from "react-icons/fi";

export default function Card({ snippet, onClick }: any) {
  const { modalActive, setModalActive } = useAppContext();
  return (
    <div
      className="relative flex flex-col justify-between bg-secondary/80 rounded-lg drop-shadow-xl hover:bg-secondary/50 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-4 min-h-[250px]"
      onClick={onClick}
    >
      <div className="mb-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <FaCode size={20} />
          </div>
          <div className="flex gap-2">
            <div className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-2">
              <GoEye size={20} />
            </div>
            <div className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-2">
              <IoStarOutline size={20} />
            </div>
          </div>
        </div>
        <h3 className="text-lg mb-1">{snippet.title}</h3>
        <div className="flex gap-2 my-3">
          {snippet.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-accent1 text-black text-xs font-semibold rounded-md px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-ellipsis text-white/80">
          {snippet.description}
        </p>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex justify-center items-center gap-2 rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out w-1/2 py-2">
          <LiaCommentSolid size={20} />
          <span>1.2k</span>
        </div>
        <div className="flex justify-center items-center gap-2 rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out w-1/2 py-2">
          <VscRepoForked size={20} />
          <span>1.2k</span>
        </div>
        <div className="flex justify-center items-center gap-2 rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out w-1/2 py-2">
          <FiCopy size={20} />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  );
}
