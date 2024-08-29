import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen h-full w-full text-white">
      <nav className="flex items-center justify-between px-8 py-4 bg-gray-800 shadow-md">
        <div>
          <p className="text-3xl font-bold leading-[45px] cursor-pointer">
            ADMIN PANEL
          </p>
        </div>
        <div className="flex space-x-6 items-center">
          <Link href="/">
            <p className="text-base font-medium hover:text-gray-400 transition duration-300">
              Home
            </p>
          </Link>
          <Link href="/">
            <p className="text-base font-medium hover:text-gray-400 transition duration-300">
              Templates
            </p>
          </Link>
          <Link href="/">
            <p className="text-base font-medium hover:text-gray-400 transition duration-300">
              Pages
            </p>
          </Link>
          <Link href="/">
            <p className="text-base font-medium hover:text-gray-400 transition duration-300">
              Element
            </p>
          </Link>
          <Link href="/">
            <p className="text-base font-medium hover:text-gray-400 transition duration-300">
              Resources
            </p>
          </Link>
        </div>
        <Link href="/login">
          <p className="flex items-center justify-center h-12 px-6 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition duration-300">
            Login
          </p>
        </Link>
      </nav>
    </div>
  );
}
