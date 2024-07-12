import { useAppContext } from "@/hooks/useAppContext";
import { FaCode } from "react-icons/fa6";
import { IoStarOutline } from "react-icons/io5";
import { VscRepoForked } from "react-icons/vsc";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LiaCommentSolid } from "react-icons/lia";
import { GoEye } from "react-icons/go";
import { FiCopy } from "react-icons/fi";
import { IoIosGitCompare } from "react-icons/io";
import { GoTrash } from "react-icons/go";

export default function Modal() {
  const { modalActive, setModalActive } = useAppContext();
  return (
    <div
      className="flex flex-col justify-between z-20 bg-secondary rounded-lg drop-shadow-xl w-3/6 min-h-[500px] p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col mb-2 h-full">
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
            <div className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-2">
              <IoIosGitCompare size={20} />
            </div>
            <div className="rounded-md hover:bg-white/20 transition duration-300 ease-in-out hover:transition hover:duration-300 hover:ease-in-out p-2">
              <GoTrash size={20} />
            </div>
          </div>
        </div>
        <h3 className="text-lg">Fetch API Response</h3>
        <div className="flex gap-2 my-3">
          <span className="bg-accent1 text-black text-xs font-semibold rounded-md px-2 py-1">
            Code
          </span>
          <span className="bg-accent1 text-black text-xs font-semibold rounded-md px-2 py-1">
            Java
          </span>
          <span className="bg-accent1 text-black text-xs font-semibold rounded-md px-2 py-1">
            Script
          </span>
        </div>
        <p className="text-sm text-ellipsis text-white/80 mb-4">
          The Fetch API provides an interface for fetching resources (including
          across the network). It will seem familiar to anyone who has used the
          Fetch API directly in JavaScript.
        </p>
        <textarea className="flex flex-col flex-grow text-sm text-ellipsis bg-primary text-white/80 h-[255px] rounded-lg p-4">
          {`<!-- NavBar -->
<header class="fixed bg-blue-600 shadow-md  z-50 w-full px-5 py-2 flex justify-between items-center">
    <router-link to="/" class="text-2xl text-white">My App</router-link>
    <div>
        <router-link to="/login" class="text-white hover:bg-gray-700 px-3 rounded py-1">Login</router-link>
        <router-link to="/register" class="text-white hover:bg-gray-700 px-3 rounded py-1">Register</router-link>
    </div>
</header>
<div class="flex">
    <!-- Sidebar -->
    <aside class="fixed bg-white h-screen py-5 shadow">
        <div class="flex flex-col text-left">
            <router-link to="/" class="hover:bg-gray-400 px-12 py-2 rounded">
                <i class="fa fa-dashboard"></i>
                <span class="">Dashboard</span>    
            </router-link>
        </div>
    </aside>
    <!-- Main Page -->
    <main class="bg-gray-200  flex-1">
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </main>
</div>`}
        </textarea>
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
