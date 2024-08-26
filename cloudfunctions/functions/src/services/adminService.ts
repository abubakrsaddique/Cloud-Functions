// userService.ts
import { admin } from "../getFirebase";

// Update user email using Firebase Admin SDK
export const updateUserEmail = async (uid: string, newEmail: string) => {
  try {
    await admin.auth().updateUser(uid, { email: newEmail });
    console.log("Successfully updated user email");
  } catch (error) {
    console.error("Error updating user email:", error);
    throw new Error("Failed to update email");
  }
};
