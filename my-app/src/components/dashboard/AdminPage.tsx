"use client";

import Link from "next/link";
import { useDashboard } from "@/src/hooks/useDashboard";
import NewUserData from "./NewUserData";

export default function AdminPage() {
  const {
    userData,
    isLoading,
    fetchError,
    editMode,
    passwordEditMode,
    emailEditMode,
    formData,
    currentPassword,
    newPassword,
    newEmail,
    setFormData,
    setCurrentPassword,
    setNewPassword,
    setNewEmail,
    handleEdit,
    handleSave,
    handleEditPassword,
    handleSavePassword,
    handleEditEmail,
    handleSaveEmail,
    handleDeleteAccount,
  } = useDashboard();

  if (isLoading) return <div>Loading...</div>;
  if (fetchError)
    return <div>Error fetching user data: {fetchError.message}</div>;

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
              />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="block w-full mb-2 p-2 border rounded"
              />
              <button
                onClick={handleSaveEmail}
                className="bg-blue-800 px-4 py-4 rounded-lg"
              >
                Save Email
              </button>
            </div>
          ) : passwordEditMode ? (
            <div>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                className="block w-full mb-2 p-2 border rounded"
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="block w-full mb-2 p-2 border rounded"
              />
              <button
                onClick={handleSavePassword}
                className="bg-blue-800 px-4 py-4 rounded-lg"
              >
                Save Password
              </button>
            </div>
          ) : (
            <div className="flex gap-5 px-4 py-4 cursor-pointer ">
              <button
                onClick={handleEdit}
                className="bg-red-400 px-4 py-4 rounded-lg"
              >
                Edit Profile
              </button>
              <button
                onClick={handleEditPassword}
                className="bg-red-400 px-4 py-4 rounded-lg"
              >
                Edit Password
              </button>
              <button
                onClick={handleEditEmail}
                className="bg-red-400 px-4 py-4 rounded-lg"
              >
                Edit Email
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-400 px-4 py-4 rounded-lg"
              >
                Delete Account
              </button>
            </div>
          )}
          {editMode && (
            <button
              onClick={handleSave}
              className="bg-blue-800 px-4 py-4 rounded-lg"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
      <NewUserData />
    </div>
  );
}
