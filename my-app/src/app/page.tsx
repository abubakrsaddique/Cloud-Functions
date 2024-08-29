import Link from "next/link";

export default function Home() {
  return (
    <div className="background min-h-screen h-full w-full">
      <nav className="flex relative   w-full h-[74px] items-center justify-between px-[50px]  py-4">
        <div>
          <p className="text-3xl font-bold leading-[45px] text-white cursor-pointer">
            ADMIN PANEL
          </p>
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <Link href="/">
            <p className="z-[10] mr-9 text-base font-medium leading-6 text-white">
              Home
            </p>
          </Link>
          <Link href="/">
            <p className="z-[10] mr-9 text-base font-medium leading-6 text-white">
              Templates
            </p>
          </Link>

          <Link href="/">
            <p className="z-[10] mr-9 text-base font-medium leading-6 text-white">
              Pages
            </p>
          </Link>

          <Link href="/">
            <p className="z-[10] mr-9 text-base font-medium leading-6 text-white">
              Element
            </p>
          </Link>

          <Link href="/">
            <p className="z-[10] mr-9 text-base font-medium leading-6 text-white">
              Resources
            </p>
          </Link>
        </div>

        <Link href="/login">
          <button className="h-9 w-24 py-6 rounded-3xl Button  text-white  text-primary  text-base font-bold cursor-pointer flex items-center justify-center">
            Login
          </button>
        </Link>
      </nav>
    </div>
  );
}
