import { useAppContext } from "@/hooks/useAppContext";
import { FiPlus } from "react-icons/fi";

export default function NewButton() {
  const { setNewSnippetModal } = useAppContext();
  return (
    <div
      onClick={() => {
        setNewSnippetModal(true);
      }}
      className="absolute  bottom-8 right-12 bg-accent1 text-black hover:bg-accent1/10 hover:text-accent1 border border-accent1 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out  rounded-lg p-[16px]"
    >
      <FiPlus size={20} />
    </div>
  );
}
