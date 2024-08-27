// import { NextResponse } from "next/server";

// const API_URL = "http://localhost:5001/functions-9db42/us-central1/api";

// export async function POST(request: Request) {
//   try {
//     const requestData = await request.json();
//     console.log("Received request data:", requestData);

//     const res = await fetch(`${API_URL}/create`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("API response error:", errorText);
//       throw new Error(`Server error: ${res.statusText} - ${errorText}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unexpected error occurred";

//     return NextResponse.json(
//       { message: "Internal Server Error", error: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: Request) {
//   try {
//     const requestData = await request.json();

//     const res = await fetch(`${API_URL}/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (!res.ok) {
//       throw new Error(`Server error: ${res.statusText}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unexpected error occurred";

//     return NextResponse.json(
//       { message: "Internal Server Error", error: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request) {
//   try {
//     const requestData = await request.json();

//     const res = await fetch(`${API_URL}/delete`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestData),
//     });

//     if (!res.ok) {
//       throw new Error(`Server error: ${res.statusText}`);
//     }

//     const data = await res.json();
//     return NextResponse.json(data, { status: res.status });
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unexpected error occurred";

//     return NextResponse.json(
//       { message: "Internal Server Error", error: errorMessage },
//       { status: 500 }
//     );
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
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
