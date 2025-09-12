import Image from "next/image";
import Link from "next/link";

const navlinks = [
  { title: "About us", path: "/about" },
  { title: "Contact us", path: "/contact" },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0  z-50  bg-white">
      <div className="mx-auto flex justify-between items-center px-4 md:px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="w-32 h-10 relative flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              height={40}
              width={128}
              priority // optional, makes logo load faster
              className="bg-green-500 size-full"
            />
          </Link>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="text-sm font-semibold bg-green-600 px-6 md:px-10 py-2 rounded-full text-white shadow-sm hover:bg-green-500 transition-colors"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
