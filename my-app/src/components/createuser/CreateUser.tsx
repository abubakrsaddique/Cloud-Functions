"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { auth } from "@/Firebase";
import { toast } from "react-toastify";

const USERS_QUERY_KEY = ["usersCreatedByAdmin"];

const schema = z.object({
  firstname: z.string().min(6, "First name must be at least 6 characters long"),
  lastname: z.string().min(4, "Last name must be at least 4 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

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
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate: handleCreateUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User Created! ");
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error("Failed To Create User...!");
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    handleCreateUser({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      role: "User",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Create User</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            First Name:
          </label>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstname")}
            className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstname ? "border-red-500" : ""
            }`}
          />
          {errors.firstname && (
            <p className="text-red-500">{errors.firstname.message as string}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Last Name:
          </label>
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastname")}
            className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastname ? "border-red-500" : ""
            }`}
          />
          {errors.lastname && (
            <p className="text-red-500">{errors.lastname.message as string}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Email:
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message as string}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Password:
          </label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message as string}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 flex items-center justify-center text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FaSpinner className="animate-spin mr-2" />
          ) : (
            "Create User"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
