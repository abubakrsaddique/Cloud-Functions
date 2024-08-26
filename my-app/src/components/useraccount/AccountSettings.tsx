import {
  getAuth,
  updateEmail as updateAuthEmail,
  updatePassword as updateAuthPassword,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "@/Firebase";

const auth = getAuth();

export async function updateUserEmailAndFirestore(
newEmail: string, newPassword?: string, password?: any) {
  const user = auth.currentUser;
  if (user) {
    try {
      if (newEmail) {
        await updateAuthEmail(user, newEmail);
        console.log("Email updated in Firebase Authentication.");
      }

      if (newPassword) {
        await updateAuthPassword(user, newPassword);
        console.log("Password updated in Firebase Authentication.");
      }

      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, { email: newEmail });
      console.log("Email updated in Firestore.");
    } catch (error) {
      console.error("Error updating email or password:", error);
      throw error;
    }
  } else {
    console.error("No user is signed in.");
  }
}
