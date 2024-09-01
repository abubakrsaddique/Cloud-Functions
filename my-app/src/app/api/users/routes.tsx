// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { firstname, lastname, email, password } = req.body;

//     try {
//       const response = await fetch(
//         "http://localhost:5001/functions-9db42/us-central1/api/user/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ firstname, lastname, email, password }),
//         }
//       );

//       const result = await response.text();
//       res.status(200).json({ message: result });
//     } catch (error) {
//       res.status(500).json({ error: "Error creating user" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstname, lastname, email, password } = req.body;

    try {
      const response = await fetch(
        "http://localhost:5001/functions-9db42/us-central1/api/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstname, lastname, email, password }),
        }
      );

      const result = await response.text();
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  } else if (req.method === "DELETE") {
    const { uid } = req.query;

    if (!uid || Array.isArray(uid)) {
      return res
        .status(400)
        .json({ error: "User ID is required and must be a single value" });
    }

    try {
      const response = await fetch(
        `http://localhost:5001/functions-9db42/us-central1/api/user/delete/${uid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.text();
      res.status(200).json({ message: result });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Error deleting user",
      });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
