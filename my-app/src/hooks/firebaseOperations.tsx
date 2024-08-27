import { auth, firestore } from "@/Firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export const fetchUser = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? userDoc.data() : {};
  }
  return {};
};

export const fetchUsersCreatedByAdmin = async () => {
  const user = auth.currentUser;
  if (user) {
    const q = query(
      collection(firestore, "users"),
      where("adminId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }
  return [];
};

export const updateUser = async (
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

export const deleteUser = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(firestore, "users", user.uid);
    await deleteDoc(userDocRef);
    await user.delete();
  }
};
