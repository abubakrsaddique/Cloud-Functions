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
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="space-y-6">
          <div className="bg-white p-4 shadow rounded-md">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium mb-1">
                  First Name:
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="block w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-base">{formData.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">
                  Last Name:
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="block w-full p-2 border rounded-md"
                  />
                ) : (
                  <p className="text-base">{formData.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">Email:</label>
                {emailEditMode ? (
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      className="block w-full mb-2 p-2 border rounded-md"
                      readOnly
                    />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="block w-full mb-2 p-2 border rounded-md"
                    />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current Password"
                      className="block w-full mb-2 p-2 border rounded-md"
                    />
                    <button
                      onClick={handleSaveEmail}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Save Email
                    </button>
                  </div>
                ) : (
                  <p className="text-base">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium mb-1">
                  Password:
                </label>
                {passwordEditMode ? (
                  <div>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current Password"
                      className="block w-full mb-2 p-2 border rounded-md"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="block w-full mb-2 p-2 border rounded-md"
                    />
                    <button
                      onClick={handleSavePassword}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Save Password
                    </button>
                  </div>
                ) : (
                  <p className="text-base"> {formData.password}</p>
                )}
              </div>

              {editMode && (
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
