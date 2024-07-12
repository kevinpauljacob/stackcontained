import Image from "next/image";
import logo from "/public/assets/stackcontained.svg";

export default function Home() {
  return (
    <div>
      <section className="relative flex flex-col justify-center items-center min-h-screen w-full">
        <div className="flex flex-col items-center text-center mb-7">
          <h1 className="flex gap-2 text-5xl mb-3">
            <Image src={logo} alt="logo" width={60} height={60} />
            stack<span className="font-bold">contained</span>
          </h1>
          <p className="text-lg w-3/5">
            Your intelligent code library that supercharges development by
            instantly organizing and surfacing relevant Stack Overflow snippets.
          </p>
        </div>
        <input
          placeholder="Paste or Search a code snippet here..."
          type="text"
          className="bg-secondary rounded-full outline-none focus:bg-secondary/80 shadow-lg transition-all w-3/5 px-6 py-4"
        />
        <div className="absolute bottom-20 bg-secondary rounded-full p-3 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
