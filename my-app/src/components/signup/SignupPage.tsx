"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const signup = async (user: User): Promise<void> => {
  const { firstName, lastName, email, password } = user;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const uid = userCredential.user?.uid;
  if (uid) {
    await setDoc(doc(firestore, "users", uid), {
      firstName,
      lastName,
      email,
      password,
      role: "Admin",
    });
  }
};

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const mutation = useMutation<void, Error, User>({
    mutationFn: signup,
    onSuccess: () => {
      router.push("/dashboard");
      console.log("Signup successful");
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ firstName, lastName, email, password });
  };

  return (
    <div className="min-h-screen h-full w-full background">
      <div className="flex flex-row justify-center items-center h-[100%]">
        <div className="relative w-[70%] ">
          <div className="flex h-full w-full items-center justify-center py-6">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <p className="mb-8 text-3xl font-bold text-[rgb(48,42,37)]">
                Signup
              </p>
              <input
                required
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black "
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mb-3 w-[400px] rounded-3xl px-6 py-4 text-sm font-medium leading-4 outline-black "
              />
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
              <p className="mb-10 mt-3 block text-sm font-normal leading-5 text-lightbrown ">
                Already have an account?{" "}
                <Link href="/login">
                  {" "}
                  <span className="cursor-pointer font-medium text-[rgb(48,42,37)]  underline">
                    Log In
                  </span>
                </Link>
              </p>
              <button
                type="submit"
                className="Button text-white font-bold h-14 rounded-3xl w-full px-8 "
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="absolute left-[-9rem] top-8  flex ">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border-[3px] border-darkbrown border-opacity-[0.1]">
              <Link href="/login">
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
