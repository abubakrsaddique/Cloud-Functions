"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { firestore, auth } from "@/Firebase";

const USERS_QUERY_KEY = ["usersCreatedByAdmin"];

const createUser = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "User";
}) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();

  const response = await fetch(
    "http://localhost:5001/functions-9db42/us-central1/api/user/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...userData,
        adminId: user.uid,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create user");
  }
};

const UserForm: React.FC = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: handleCreateUser, error } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("User creation failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateUser({ firstname, lastname, email, password, role: "User" });
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Create User</h1>
      <div className="mb-4">
        <label className="block">First Name:</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Last Name:</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Create User
      </button>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </form>
  );
};

export default UserForm;
