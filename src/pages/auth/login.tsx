import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "/public/assets/stackcontained.svg";
import { VscGithubInverted } from "react-icons/vsc";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if ((id === "username" || id === "password") && /\s/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  useEffect(() => {
    if (session?.status === "authenticated") router.push("/dashboard");
  }, [session?.status, router]);

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 6 characters long");
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        password: formData.password,
      });

      if (res?.error) {
        setError("Invalid Username or Password");
        toast.error("Invalid Username or Password");
      }
      if (res?.url) {
        router.replace("/dashboard");
      }
    } catch (error) {
      setError("Internal server error");
      toast.error("Internal server error");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-secondary">
      <div className="flex flex-col bg-primary/60 border-[0.5px] border-white/10 rounded-lg min-w-[500px] p-10">
        <form onSubmit={handleSubmit}>
          <Link href="/" className="flex justify-center gap-2 mb-7">
            <Image src={logo} alt="logo" width={30} height={30} />
            <p>
              stack<span className="font-bold">contained</span>
            </p>
          </Link>
          <div className="mb-8">
            <p className="text-2xl font-bold mb-1">Welcome back,</p>
            <p className="text-xs font-semibold">
              Login to access the application
            </p>
          </div>
          <div className="w-full">
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-xs" htmlFor="username">
                Username
              </label>
              <input
                className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md p-2.5"
                type="text"
                placeholder="johndoe"
                id="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <div className="flex flex-col gap-2 w-full mb-4">
              <label className="text-xs" htmlFor="password">
                Password
              </label>
              <input
                className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md p-2.5"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div className="flex items-center justify-between gap-2 mt-6">
              <p>
                <Link
                  href="/auth/register"
                  className="text-xs hover:font-semibold hover:transition hover:duration-500 hover:ease-in-out transition duration-500 ease-in-out"
                >
                  Don&apos;t have an account? Register here.
                </Link>
              </p>
              <button className="bg-accent1 text-black hover:bg-accent1/10 hover:text-accent1 border border-accent1 text-md font-extrabold hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md px-4 py-2">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-center mb-4 mt-6">
          <span className="w-[80px] h-[0.5px] bg-white/20"></span>
          <span>OR</span>
          <span className="w-[80px] h-[0.5px] bg-white/20"></span>
        </div>
        <button
          onClick={() => signIn("github")}
          className="flex justify-center items-center gap-2 bg-secondary text-sm rounded-md border-[0.5px] border-white/10 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out w-full py-2.5"
        >
          <VscGithubInverted size={20} />
          Sign In with GitHub
        </button>
      </div>
    </div>
  );
}
