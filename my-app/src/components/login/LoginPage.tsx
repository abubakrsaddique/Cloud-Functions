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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-600 mb-4">
            <a href="#" className="underline">
              Forgot password?
            </a>
          </p>
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          {isError && (
            <p className="text-red-500 mt-2 text-center">
              Login failed. Please try again.
            </p>
          )}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500 font-semibold underline cursor-pointer">
              Sign Up
            </span>
          </Link>
        </p>
        <div className="absolute top-4 left-4 flex items-center">
          <Link href="/">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-md">
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.58325 11.2488L1.54159 6.22884L6.58325 1.20801"
                  stroke="#302A25"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
