import Link from "next/link";

const navlinks = [
  { title: "About us", path: "/about" },
  { title: "Contact us", path: "/contact" },
];

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="mx-auto flex justify-between items-center px-8 py-4">
        {/* Logo + Nav */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors"
          >
            WeWork
          </Link>

          {/* Navlinks */}
          <nav className="flex gap-8">
            {navlinks.map((nav) => (
              <Link
                key={nav.title}
                href={nav.path}
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors relative group"
              >
                {nav.title}
                {/* underline effect */}
                <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-green-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
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
            className="text-sm font-semibold bg-green-600 px-6 py-2 rounded-full text-white shadow-sm hover:bg-green-500 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
