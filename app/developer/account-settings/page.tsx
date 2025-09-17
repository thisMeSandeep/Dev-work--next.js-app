import Image from "next/image";
import Link from "next/link";

const AccountSettings = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md text-center">
        <Image
          src="/assets/comingSoon.svg"
          width={100}
          height={100}
          alt="Account Settings Coming Soon"
          className="w-full h-auto mb-8"
        />

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Account Settings — Coming Soon
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Thank you for your patience! We are working behind the scenes to build this feature.
          It will be live shortly. 🙌
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AccountSettings;
