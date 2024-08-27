import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/Firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { uid, newEmail, currentPassword } = req.body;

    try {
      const user = await auth.currentUser;
      if (!user) throw new Error("No user logged in");

      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
