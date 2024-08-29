"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import Link from "next/link";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserCredential> => {
  const authInstance = getAuth();
  return await signInWithEmailAndPassword(authInstance, email, password);
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation<
    UserCredential,
    Error,
    { email: string; password: string }
  >({
    mutationFn: login,
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: () => {
      alert("Login failed. Please check your credentials.");
    },
  });

  const { mutate, isError } = mutation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="min-h-screen h-full w-full background">
      <div className="flex flex-row justify-center items-center h-[100%]">
        <div className="relative w-[70%] ">
          <div className="flex h-full w-full items-center justify-center py-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <p className="mb-8 text-3xl font-bold text-[rgb(48,42,37)]">
                Login
              </p>
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black "
              />
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black "
              />
              <p className="text-darkbrown mt-2 w-fit text-sm font-medium leading-5 underline cursor-pointer">
                <a href="#">Forgot password?</a>
              </p>
              <p className="mt-10 text-center text-sm font-medium text-lightbrown">
                You don’t have an account?{" "}
                <Link href="/signup">
                  <span className="font-semibold cursor-pointer text-[rgb(48,42,37)] underline">
                    Sign Up
                  </span>
                </Link>
              </p>

              <button
                type="submit"
                className=" Button font-bold text-white h-14 rounded-3xl w-full px-8 mt-11"
              >
                <span className="relative z-10">Login</span>
              </button>
              {isError && (
                <p className="text-red-500 mt-2">
                  Login failed. Please try again.
                </p>
              )}
            </form>
          </div>
          <div className="absolute left-[-9rem] top-8  flex ">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1]">
              <Link href="/">
                <svg
                  width="16"
                  height="13"
                  viewBox="0 0 16 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.54175 6.22868L14.0417 6.22868"
                    stroke="#302A25"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.58325 11.2488L1.54159 6.22884L6.58325 1.20801"
                    stroke="#302A25"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
