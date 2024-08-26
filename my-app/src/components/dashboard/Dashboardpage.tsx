"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, firestore } from "@/Firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import Link from "next/link";

const fetchUser = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : {};
  }
  return {};
};

const updateUser = async (
  userData: { firstName?: string; lastName?: string; password?: string },
  newEmail?: string,
  currentPassword?: string
) => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(firestore, "users", user.uid);

    try {
      await updateDoc(userDocRef, userData);

      if (newEmail) {
        if (currentPassword) {
          const credential = EmailAuthProvider.credential(
            user.email!,
            currentPassword
          );
          await reauthenticateWithCredential(user, credential);
        }

        await updateEmail(user, newEmail);
      }

      if (userData.password) {
        await updatePassword(user, userData.password);
      }
    } catch (error) {
      console.error(
        "Error updating Firestore or Firebase Authentication:",
        error
      );
    }
  }
};

const deleteUser = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(firestore, "users", user.uid);
    await deleteDoc(userDocRef);
    await user.delete();
  }
};

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const queryKey = ["user"];

  const {
    data: userData,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey,
    queryFn: fetchUser,
  });

  const { mutate: handleUpdate, error: updateError } = useMutation({
    mutationFn: (data: {
      userData: { firstName?: string; lastName?: string; password?: string };
      newEmail?: string;
      currentPassword?: string;
    }) => updateUser(data.userData, data.newEmail, data.currentPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const { mutate: handleDelete, error: deleteError } = useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(userData || {});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(formData.email || "");

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    try {
      await handleUpdate({
        userData: formData,
        newEmail: emailEditMode ? newEmail : undefined,
        currentPassword:
          passwordEditMode || emailEditMode ? currentPassword : undefined,
      });
      setEditMode(false);
      setPasswordEditMode(false);
      setEmailEditMode(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleEditPassword = () => setPasswordEditMode(true);

  const handleSavePassword = async () => {
    try {
      await handleUpdate({
        userData: { ...formData, password: newPassword },
        currentPassword,
      });
      setPasswordEditMode(false);
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handleEditEmail = () => setEmailEditMode(true);

  const handleSaveEmail = async () => {
    try {
      await handleUpdate({
        userData: { ...formData, email: newEmail },
        newEmail,
        currentPassword,
      });
      setEmailEditMode(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5001/functions-9db42/us-central1/api/updateEmail",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ newEmail }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update email");
  //     }

  //     const data = await response.json();
  //     console.log("Email updated successfully:", data);

  //     // Optionally, handle any additional logic here
  //     setEmailEditMode(false);
  //   } catch (error) {
  //     console.error("Error updating email:");
  //   }
  // };

  const handleDeleteAccount = async () => {
    try {
      await handleDelete();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  if (isLoading) return <div>Loading...</div>;
  if (fetchError)
    return <div>Error fetching user data: {fetchError.message}</div>;
  if (!userData) return <div>No user data found.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <div className="flex items-center mb-4">
        <Link href="/user">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4">
            Create User
          </button>
        </Link>
      </div>

      <div className="mb-4">
        <div>
          <label>First Name:</label>
          {editMode ? (
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
          ) : (
            formData.firstName
          )}
        </div>
        <div>
          <label>Last Name:</label>{" "}
          {editMode ? (
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
            />
          ) : (
            formData.lastName
          )}
        </div>

        <div>
          <label>Email:</label>
          {formData.email}
          <div>
            <label>Password:</label>
            {formData.password}
          </div>
          {emailEditMode ? (
            <div>
              <input
                type="email"
                value={formData.email}
                className="block w-full mb-2 p-2 border rounded"
                readOnly
              />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
                placeholder="New Email"
              />
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
              />
              <button
                onClick={handleSaveEmail}
                className="block w-full p-2 bg-green-500 text-white rounded"
              >
                Save Email
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={handleEditEmail}
                className="block w-full p-2 bg-yellow-500 text-white rounded mt-4"
              >
                Edit Email
              </button>
            </div>
          )}
        </div>

        <div>
          {passwordEditMode ? (
            <div>
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full mb-2 p-2 border rounded"
              />
              <button
                onClick={handleSavePassword}
                className="block w-full p-2 bg-green-500 text-white rounded"
              >
                Save Password
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditPassword}
              className="block w-full p-2 bg-yellow-500 text-white rounded mt-4"
            >
              Edit Password
            </button>
          )}
        </div>
      </div>
      {editMode ? (
        <div>
          <button
            onClick={handleSave}
            className="block w-full p-2 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="block w-full p-2 bg-gray-500 text-white rounded mt-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={handleEdit}
          className="block w-full p-2 bg-blue-500 text-white rounded"
        >
          Edit Profile
        </button>
      )}
      <button
        onClick={handleDeleteAccount}
        className="block w-full p-2 bg-red-500 text-white rounded mt-4"
      >
        Delete Account
      </button>
      {updateError && <p>Error updating profile: {updateError.message}</p>}
      {deleteError && <p>Error deleting account: {deleteError.message}</p>}
    </div>
  );
}
