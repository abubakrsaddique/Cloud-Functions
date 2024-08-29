"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth } from "@/Firebase";

interface SidebarProps {
  handleEdit?: () => void;
  handleEditPassword?: () => void;
  handleEditEmail?: () => void;
  handleDeleteAccount?: () => void;
}

export default function Sidebar({
  handleEdit,
  handleEditPassword,
  handleEditEmail,
  handleDeleteAccount,
}: SidebarProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      const auth = getAuth();
      const firestore = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email;

        if (userEmail) {
          try {
            console.log("Checking role for user:", userEmail);

            const usersCollection = collection(firestore, "users");
            const q = query(usersCollection, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
              console.error("No user document found for the email:", userEmail);
              setIsAdmin(false);
            } else {
              let role = "";

              querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log("Fetched user data:", data);

                role = data.role;
              });

              setIsAdmin(role === "Admin");
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            setIsAdmin(false);
          }
        } else {
          console.error("User email is not available.");
          setIsAdmin(false);
        }
      } else {
        console.error("No user is currently logged in.");
        setIsAdmin(false);
      }

      setLoading(false);
    };

    checkUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-2xl mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">
          <p className="hover:bg-gray-700 p-2 rounded">Dashboard</p>
        </Link>
        {isAdmin && (
          <Link href="/createuser">
            <p className="hover:bg-gray-700 p-2 rounded">Create User</p>
          </Link>
        )}
        <p onClick={handleEdit} className="hover:bg-gray-700 p-2 rounded">
          Edit Details
        </p>
        <p onClick={handleEditEmail} className="hover:bg-gray-700 p-2 rounded">
          Edit Email
        </p>
        <p
          onClick={handleEditPassword}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Edit Password
        </p>
        <p
          onClick={handleDeleteAccount}
          className="hover:bg-gray-700 p-2 rounded"
        >
          Delete Account
        </p>
        {isAdmin && (
          <Link href="/user-detail">
            <p className="hover:bg-gray-700 p-2 rounded">Users</p>
          </Link>
        )}
        <Link href="">
          <p className="hover:bg-gray-700 p-2 rounded">Settings</p>
        </Link>
        <p onClick={handleLogout} className="hover:bg-gray-700 p-2 rounded">
          Logout
        </p>
      </nav>
    </div>
  );
}
