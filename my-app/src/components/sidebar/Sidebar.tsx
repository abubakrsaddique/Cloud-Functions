"use client";

import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-2xl mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">
          <p className="hover:bg-gray-700 p-2 rounded">Dashboard</p>
        </Link>
        <Link href="/createuser">
          <p className="hover:bg-gray-700 p-2 rounded">Create User</p>
        </Link>
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
        <Link href="users-detail">
          <p className="hover:bg-gray-700 p-2 rounded">Users</p>
        </Link>
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
