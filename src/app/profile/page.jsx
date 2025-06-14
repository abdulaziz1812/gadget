'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdPerson } from "react-icons/io";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
        <div className="flex justify-center items-center py-10 min-h-screen">
          <ClipLoader size={50} />
        </div>
      );
  }

  if (!session) return null;

  const user = session.user;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const goToMyPosts = () => {
    router.push("/my_posts");
  };

  return (
   <div className="w-8/12 flex mx-auto justify-center items-center min-h-s">
     <div className=" mx-auto p-6 mt-10 bg-white rounded shadow-xl w-full h-1/4">
      <div className="flex flex-col items-center  mb-8">
        {user.image ? (
          <Image
            src={user.image}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 flex items-center justify-center border-2 rounded-full">
            <IoMdPerson size={24} />
          </div>
        )}
        <h1 className="text-3xl font-semibold mt-4">{user.name || "No Name"}</h1>
        <p className="text-gray-600">{user.email || "No Email"}</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleSignOut}
            className="btn btn-neutral"
          >
            Sign Out
          </button>

          <button
            onClick={goToMyPosts}
            className="btn btn-primary"
          >
            My Posts
          </button>
        </div>
      </div>
    </div>
   </div>
  );
}
