import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SocialLogin() {
  const router = useRouter();
  const session = useSession();

  const handelSocialLogin = async (providerName) => {
    signIn(providerName, { redirect: false });
  };

  useEffect(() => {
    if (session?.data?.user) {
      toast.success("Login successful!");
      router.push("/");
    }
  }, [session?.data?.user]);

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => handelSocialLogin("google")}
      >
        Login with Google
      </Button>
    </div>
  );
}
