import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUser,
  fetchUsersCreatedByAdmin,
  updateUser,
  deleteUser,
} from "./firebaseOperations";

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};

export const useUsersCreatedByAdminQuery = () => {
  return useQuery({
    queryKey: ["usersCreatedByAdmin"],
    queryFn: fetchUsersCreatedByAdmin,
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      userData: { firstName?: string; lastName?: string; password?: string };
      newEmail?: string;
      currentPassword?: string;
    }) => updateUser(data.userData, data.newEmail, data.currentPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["usersCreatedByAdmin"] });
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: deleteUser,
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });
};
