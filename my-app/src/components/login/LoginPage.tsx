"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

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
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="block w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
        {isError && (
          <p className="text-red-500 mt-2">Login failed. Please try again.</p>
        )}
      </form>
    </div>
  );
}
