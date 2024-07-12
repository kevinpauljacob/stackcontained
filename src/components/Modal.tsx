import { useAppContext } from "@/hooks/useAppContext";
import { useSession } from "next-auth/react";
import { FaCode } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { VscRepoForked } from "react-icons/vsc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LiaCommentSolid } from "react-icons/lia";
import { GoEye } from "react-icons/go";
import { FiCopy } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";

export default function Modal({ snippet, onSnippetDeleted }: any) {
  const session = useSession();
  const { modalActive, setModalActive } = useAppContext();
  const handleDeleteSnippet = async () => {
    try {
      const res = await fetch(`/api/snippets/${snippet._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.data?.user.id,
          id: snippet._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      } else {
        setModalActive(false);
        onSnippetDeleted();
        console.log("Snippet deleted successfully", data);
        toast.success("Snippet deleted successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Internal server error");
      console.error(error.message || "Internal server error");
    }
  };
  return (
    <div
      className="flex flex-col justify-between z-20 bg-secondary rounded-lg drop-shadow-xl w-3/6 p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col mb-2 h-full">
        <div className="flex items-center justify-between mb-3">
          <div>
            <FaCode size={20} />
          </div>
          <div className="flex gap-2">
            <div className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:text-accent1 hover:transition hover:duration-300 hover:ease-in-out p-2">
              <GoEye size={20} />
            </div>
            <div className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:text-accent1 hover:transition hover:duration-300 hover:ease-in-out p-2">
              <IoStarOutline size={20} />
            </div>
            <div className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:text-accent1 hover:transition hover:duration-300 hover:ease-in-out p-2">
              <IoIosGitCompare size={20} />
            </div>
            <div
              onClick={handleDeleteSnippet}
              className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:text-red-600 hover:transition hover:duration-300 hover:ease-in-out p-2"
            >
              <GoTrash size={20} />
            </div>
          </div>
        </div>
        <h3 className="text-lg mb-3">{snippet.title}</h3>
        {snippet.tags.length > 0 && (
          <div className="flex gap-2 mb-3">
            {snippet.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-accent1 text-black text-xs font-semibold rounded-md px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {snippet.description && (
          <p className="text-sm text-ellipsis text-white/80 mb-4">
            {snippet.description}
          </p>
        )}
        {snippet.references.length > 0 && (
          <div className="flex gap-2 my-3">
            {snippet.references.map((reference: string, index: number) => (
              <span
                key={index}
                className="bg-accent1 text-black text-xs font-semibold rounded-md px-2 py-1"
              >
                {reference}
              </span>
            ))}
          </div>
        )}
        <textarea className="flex flex-col flex-grow text-sm text-ellipsis bg-primary text-white/80 h-[255px] rounded-lg p-4">
          {snippet.code}
        </textarea>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex justify-center items-center gap-2 rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:text-accent1 hover:transition hover:duration-300 hover:ease-in-out w-1/2 py-2">
          <LiaCommentSolid size={20} />
          <span>1.2k</span>
        </div>
        <div className="flex justify-center items-center gap-2 rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:text-accent1 hover:transition hover:duration-300 hover:ease-in-out w-1/2 py-2">
          <VscRepoForked size={20} />
          <span>1.2k</span>
        </div>
        <div className="flex justify-center items-center gap-2 rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:text-accent1 hover:transition hover:duration-300 hover:ease-in-out w-1/2 py-2">
          <FiCopy size={20} />
          <span>1.2k</span>
        </div>
      </div>
    </div>
  );
}
