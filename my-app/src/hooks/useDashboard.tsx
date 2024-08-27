import { useState, useEffect } from "react";
import {
  useUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/src/hooks/useUserQueries";

export function useDashboard() {
  const { data: userData, isLoading, error: fetchError } = useUserQuery();
  const { mutate: handleUpdate, error: updateError } = useUpdateUserMutation();
  const { mutate: handleDelete, error: deleteError } = useDeleteUserMutation();

  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(userData || {});
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(formData.email || "");

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

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

  const handleDeleteAccount = async () => {
    try {
      await handleDelete();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return {
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
  };
}
