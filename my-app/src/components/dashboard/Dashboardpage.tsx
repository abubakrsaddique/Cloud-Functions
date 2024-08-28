"use client";

import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

export default function DashboardPage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      const auth = getAuth();
      const firestore = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email;

        if (userEmail) {
          try {
            console.log("Checking role for user:", userEmail);

            const usersCollection = collection(firestore, "users");
            const q = query(usersCollection, where("email", "==", userEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
              console.error("No user document found for the email:", userEmail);
              setIsAdmin(false);
            } else {
              let role = "";

              querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log("Fetched user data:", data);

                role = data.role;
              });

              setIsAdmin(role === "Admin");
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            setIsAdmin(false);
          }
        } else {
          console.error("User email is not available.");
          setIsAdmin(false);
        }
      } else {
        console.error("No user is currently logged in.");
        setIsAdmin(false);
      }

      setLoading(false);
    };

    checkUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAdmin === null ? (
        <div>Loading...</div>
      ) : isAdmin ? (
        <AdminPage />
      ) : (
        <UserPage />
      )}
    </div>
  );
}
