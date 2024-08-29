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

      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Admin Panel</h1>
        <p className="text-lg mb-8">
          Manage and oversee all your administrative tasks from this dashboard.
        </p>
      </header>

      <main className="px-8 py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">1,234</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
            <p className="text-3xl font-bold">567</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">New Messages</h2>
            <p className="text-3xl font-bold">89</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">© 2024 Admin Panel. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/">
            <p className="hover:text-gray-400">Privacy Policy</p>
          </Link>
          <Link href="/">
            <p className="hover:text-gray-400">Terms of Service</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
