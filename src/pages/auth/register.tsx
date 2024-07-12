import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/stackcontained.svg";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (
      (id === "username" || id === "email" || id === "password") &&
      /\s/.test(value)
    ) {
      return;
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password === "" || password.length >= 8;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email address");
      toast.error("Invalid email address");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Password must be at least 8 characters long");
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        toast.error(data.message || "Something went wrong");
      } else {
        // Handle successful registration, e.g., redirect to login page
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        console.log("User registered successfully");
        toast.success("User registered successfully");
        router.replace("/login");
      }
    } catch (error) {
      setError("Internal server error");
      toast.error("Internal server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-secondary">
      <form
        className="flex flex-col bg-primary/60 border-[0.5px] border-white/10 rounded-lg min-w-[500px] p-10"
        onSubmit={handleSubmit}
      >
        <Link href="/" className="flex justify-center gap-2 mb-6">
          <Image src={logo} alt="logo" width={30} height={30} />
          <p>
            stack<span className="font-bold">contained</span>
          </p>
        </Link>
        <div className="mb-8">
          <p className="text-2xl font-bold mb-1">Register</p>
          <p className="text-xs font-semibold">
            Create a new account to access the application
          </p>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs" htmlFor="name">
              Name
            </label>
            <input
              className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md p-2.5"
              type="text"
              placeholder="John Doe"
              id="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
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
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-xs" htmlFor="email">
              Email
            </label>
            <input
              className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md p-2.5"
              type="email"
              placeholder="johndoe@email.com"
              id="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <div className="flex items-center justify-between gap-4">
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
            <div className="flex flex-col gap-2 w-full mb-4">
              <label className="text-xs" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="bg-secondary text-sm border-[0.5px] border-white/10 outline-none focus:border-white/20 focus:bg-secondary/90 hover:border-white/20 hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md p-2.5"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-2 mt-6">
            <p>
              <Link
                href="/auth/login"
                className="text-xs hover:font-semibold hover:transition hover:duration-500 hover:ease-in-out transition duration-500 ease-in-out"
              >
                Already have an account? Login here.
              </Link>
            </p>
            <button className="bg-accent1 text-black hover:bg-accent1/10 hover:text-accent1 border border-accent1 text-md font-extrabold hover:transition hover:duration-300 hover:ease-in-out transition duration-300 ease-in-out rounded-md px-4 py-2">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
