import { useAppContext } from "@/hooks/useAppContext";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { IoSunny } from "react-icons/io5";
import { BsMoonStarsFill } from "react-icons/bs";

export default function DropDown({ username }: { username: string }) {
  const { theme, setTheme } = useAppContext();
  return (
    <div
      className="absolute top-[96px] right-12 z-50 bg-secondary text-white text-xs shadow-xl rounded-md w-[160px] p-1 animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      <Link
        href={`/profile/${username}`}
        className="flex items-center gap-2 rounded-[5px] transition duration-300 ease-in-out hover:bg-primary hover:transition hover:duration-300 hover:ease-in-out p-1.5 mb-1"
      >
        <FiUser size={20} />
        <span>Account Settings</span>
      </Link>
      <div className="bg-primary py-[1px] m-1"></div>
      <p
        className="flex items-center gap-2 rounded-[5px] transition duration-300 ease-in-out hover:bg-accent1 hover:text-black hover:transition hover:duration-300 hover:ease-in-out p-1.5"
        onClick={() => {
          setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
        }}
      >
        {theme === "dark" ? (
          <BsMoonStarsFill size={20} />
        ) : (
          <IoSunny size={20} />
        )}
        <span>Theme</span>
      </p>
      <div className="bg-primary py-[1px] m-1"></div>
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2 rounded-[5px] transition duration-300 ease-in-out hover:bg-accent1 hover:text-black hover:transition hover:duration-300 hover:ease-in-out w-full p-1.5"
      >
        <IoLogOutOutline size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}
