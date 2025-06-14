"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-base-100 border-t border-gray-300 mt-10">
      <div className="w-full mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <Link href="/" className="flex items-center mb-4 md:mb-0">
          <Image
            src="/logo.png"
            alt="logo"
            width={90}
            height={80}
            className="object-contain"
          />
        </Link>

        <p className="md:mx-4">
          © {new Date().getFullYear()} YourSiteName. All rights reserved.
        </p>

        <ul className="flex space-x-4 mt-4 md:mt-0">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link href="/my_posts" className="hover:text-blue-600">
              My Posts
            </Link>
          </li>
          <li>
            <Link href="/create" className="hover:text-blue-600">
              Create Posts
            </Link>
          </li>
          <li>
            <Link href="/profile" className="hover:text-blue-600">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
