import { useAppContext } from "@/hooks/useAppContext";
import { useSession } from "next-auth/react";
import DropDown from "./DropDown";
import { IoIosSearch } from "react-icons/io";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const session = useSession();
  const { dropDown, setDropDown } = useAppContext();
  return (
    <div className="">
      <div className="flex flex-grow items-center gap-4 w-full mb-16">
        <div className="flex gap-2 items-center bg-secondary rounded-lg shadow-lg hover:bg-secondary/60 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out w-full px-6">
          <input
            placeholder="Paste or Search a code snippet here..."
            type="text"
            className="bg-transparent rounded-full outline-none text-sm transition-all w-full px-1 py-4"
          />
          <IoIosSearch size={20} />
        </div>
        <div
          className="flex items-center gap-2 bg-secondary rounded-lg min-w-[160px] px-2 py-2"
          onClick={() => {
            setDropDown(!dropDown);
          }}
        >
          <div className="bg-accent1 border-2 border-accent1 text-black rounded-full shadow-xl p-1.5">
            <FiUser size={20} />
            {dropDown && <DropDown username={session?.data?.user.username} />}
          </div>
          <p className="w-full">{session.data?.user.name}</p>
        </div>
      </div>
    </div>
  );
}
