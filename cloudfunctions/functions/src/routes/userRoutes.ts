import * as express from "express";
import { admin } from "../getFirebase";
import { updateUserEmail } from "../services/adminService";
import { authenticate } from "../middleware";

const router = express.Router();

// Middleware for authentication
router.use(authenticate);

router.post(
  "/updateEmail",
  async (req: express.Request, res: express.Response) => {
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
          await updateUserEmail(uid, newEmail);
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
  }
);

// Delete user route
router.delete("/", async (req: express.Request, res: express.Response) => {
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
});

export default router;
