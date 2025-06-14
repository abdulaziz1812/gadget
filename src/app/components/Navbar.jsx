"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdPerson } from "react-icons/io";

export default function Navbar() {
  const { data: session, status } = useSession();

  const navMenu = () => {
    return (
      <>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/my_posts"}>My Posts</Link>
        </li>
        <li>
          <Link href={"/create"}>Create Posts</Link>
        </li>
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
      </>
    );
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navMenu()}
            </ul>
          </div>

          <Link href="/">
            <Image src="/logo.png" width={107} height={100} alt="logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navMenu()}</ul>
        </div>
        <div className="navbar-end">
          {status == "authenticated" ? (
            <div className="flex justify-items-center gap-2">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  width={40}
                  height={30}
                  alt="user"
                  className="border-2 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full">
                  <IoMdPerson size={24} />
                </div>
              )}

              <button onClick={() => signOut()} className="btn btn-ghost btn-">
                Log Out
              </button>
            </div>
          ) : (
            <Link href={"/login"} className="btn btn-ghost">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
