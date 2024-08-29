"use client";

import { useDashboard } from "@/src/hooks/useDashboard";
import Sidebar from "../sidebar/Sidebar";

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
    <div className="flex min-h-screen h-full">
      <Sidebar
        handleEdit={handleEdit}
        handleEditPassword={handleEditPassword}
        handleEditEmail={handleEditEmail}
        handleDeleteAccount={handleDeleteAccount}
      />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl mb-4">Admin Detail</h1>
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
            {emailEditMode && (
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
            )}
            {passwordEditMode && (
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
      </div>
    </div>
  );
}
