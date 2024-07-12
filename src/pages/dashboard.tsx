import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/hooks/useAppContext";
import { useSession } from "next-auth/react";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import Header from "@/components/Header";
import Modal from "@/components/Modal";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const { modalActive, setModalActive } = useAppContext();

  useEffect(() => {
    if (session?.status === "unauthenticated") router.push("/login");
  }, [session?.status, router]);

  return (
    <main className="relative flex bg-primary">
      <Sidebar />
      <div className="relative flex-1 flex-col w-full min-h-screen px-12 py-8">
        <Header />
        {modalActive && (
          <div
            className={`absolute top-0 left-0 z-10 flex justify-center items-center w-full h-full bg-primary/70 ${
              modalActive ? "animate-fadeIn" : "animate-fadeOut"
            }`}
            onClick={() => {
              setModalActive(false);
            }}
          >
            <Modal />
          </div>
        )}
        <div className="w-[1180px] mx-auto">
          <section className="grid grid-cols-3 gap-4 ">
            {Array.from({ length: 6 }, (_, index) => (
              <Card key={index} />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
