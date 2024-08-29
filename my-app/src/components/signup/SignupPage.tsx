"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const signupSchema = z.object({
  firstName: z.string().min(6, "First name must be at least  characters long"),
  lastName: z.string().min(4, "Last name must be at least 4 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignupSchema = z.infer<typeof signupSchema>;

const signup = async (user: SignupSchema): Promise<void> => {
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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const mutation = useMutation<void, Error, SignupSchema>({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signup successful! ");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error("Signup failed...!");
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    mutation.mutate(data);
    reset;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.firstName && (
            <p className="text-red-600">{errors.firstName.message}</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && (
            <p className="text-red-600">{errors.lastName.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}

          <p className="text-sm text-gray-600 mb-4">
            Already have an account?{" "}
            <Link href="/login">
              <span className="text-blue-500 font-semibold underline cursor-pointer">
                Log In
              </span>
            </Link>
          </p>
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-500 items-center justify-center text-white font-bold py-3 px-6 rounded-lg w-full hover:bg-blue-600 transition duration-300"
          >
            {isSubmitting ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="absolute top-4 left-4 flex items-center">
          <Link href="/login">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white shadow-md cursor-pointer">
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
