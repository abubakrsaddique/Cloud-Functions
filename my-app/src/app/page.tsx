import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-semibold">MyApp</div>
          <div>
            <Link href="/login">
              <p className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                Login
              </p>
            </Link>
            <Link href="/signup">
              <p className="text-white px-4 py-2 hover:bg-gray-700 rounded">
                Signup
              </p>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
