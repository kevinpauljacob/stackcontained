import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/hooks/useAppContext";
import { useSession } from "next-auth/react";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import NewSnippetModal from "@/components/NewSnippetModal";
import NewButton from "@/components/NewButton";
import { toast } from "react-toastify";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const { modalActive, newSnippetModal, setModalActive, setNewSnippetModal } =
    useAppContext();
  const [snippets, setSnippets] = useState([]);
  const [activeSnippet, setActiveSnippet] = useState(null);

  const openModal = (snippet: any) => {
    setModalActive(true);
    setActiveSnippet(snippet);
  };

  const fetchSnippets = async () => {
    try {
      const res = await fetch(`/api/snippets?userId=${session.data?.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      } else {
        setSnippets(data);
        console.log("Snippets fetched successfully", data);
      }
    } catch (error: any) {
      toast.error(error.message || "Internal server error");
      console.error(error.message || "Internal server error");
    }
  };

  useEffect(() => {
    if (session?.status === "unauthenticated") router.push("/login");
  }, [session?.status, router]);

  useEffect(() => {
    if (session.data?.user.id) {
      fetchSnippets();
    }
  }, [session.data?.user.id]);

  return (
    <main className="flex bg-primary">
      <Sidebar />
      <div className="relative flex-1 flex-col w-full min-h-screen px-12 py-8">
        <Header />
        <NewButton />
        {modalActive && (
          <div
            className={`absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full bg-primary/70 ${
              modalActive ? "animate-fadeIn" : "animate-fadeOut"
            }`}
            onClick={() => {
              setModalActive(false);
            }}
          >
            <Modal snippet={activeSnippet} onSnippetDeleted={fetchSnippets} />
          </div>
        )}
        {newSnippetModal && (
          <div
            className={`absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full bg-primary/70 ${
              newSnippetModal ? "animate-fadeIn" : "animate-fadeOut"
            }`}
            onClick={() => {
              setNewSnippetModal(false);
            }}
          >
            <NewSnippetModal />
          </div>
        )}
        <div className="w-[1180px] mx-auto">
          <section className="grid grid-cols-3 gap-4 ">
            {snippets.map((snippet, index) => (
              <Card
                key={index}
                snippet={snippet}
                onClick={() => openModal(snippet)}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
