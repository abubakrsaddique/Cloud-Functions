// controllers/userController.ts
import { Request, Response } from "express";
import { admin } from "../getFirebase";
import { User } from "../models/user";

if (!admin.apps.length) {
  admin.initializeApp();
}

// Function to update user email and other details

export const updateUser = async (req: Request, res: Response) => {
  const user = req.user as admin.auth.DecodedIdToken;
  const uid = user?.uid;
  const { newEmail, firstName, lastName, password } = req.body;

  try {
    if (uid) {
      // Update user information in Firestore
      await admin.firestore().collection("users").doc(uid).update({
        firstName,
        lastName,
        email: newEmail,
      });

      // Update user email in Firebase Authentication
      try {
        await admin.auth().updateUser(uid, { email: newEmail });
        res.status(200).json({ message: "Email updated successfully" });
      } catch (authError) {
        console.error("Error updating authentication details:", authError);
        res.status(400).send("Failed to update authentication details");
      }

      // Handle password updates if necessary
      if (password) {
        console.log("Password update is handled separately in Firebase Auth");
      }
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
};

// Function to delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const uid = req.user?.uid;
  try {
    if (uid) {
      await admin.auth().deleteUser(uid);
      await admin.firestore().collection("users").doc(uid).delete();
      res.status(200).send("User deleted");
    } else {
      res.status(400).send("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send("Error deleting user");
  }
};

//  create a new user

export const createUser = async (req: Request, res: Response) => {
  console.log("CreateUser controller hit");
  const { firstname, lastname, email, password }: User = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send("Name, email, and password are required");
  }

  try {
    const docRef = admin.firestore().collection("users").doc();
    await docRef.set({
      firstname,
      lastname,
      email,
      password,
    });

    return res.status(200).send("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
    return res.status(500).send("Error writing document");
  }
};
