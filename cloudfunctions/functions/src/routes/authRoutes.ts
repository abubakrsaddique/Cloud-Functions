import * as express from "express";
import { admin } from "../getFirebase";

const router = express.Router();

// Signup route
router.post("/signup", async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      firstName,
      lastName,
      email,
    });
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send("Error creating user");
  }
});

// Login route
router.post("/login", async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  try {
    const user = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(user.uid);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(401).send("Invalid email or password");
  }
});

export default router;
