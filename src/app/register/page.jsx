"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/src/redux/api/api";
import toast, { Toaster } from "react-hot-toast";
import SocialLogin from "../components/SocialLogin";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [registerUser] = useRegisterUserMutation();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 6 characters, include one uppercase, one lowercase, and one special character."
      );
      return;
    }

    try {
      await registerUser({ name, email, password }).unwrap();
      toast.success("Registered successfully!");
      router.push("/login");
      form.reset();
    } catch (err) {
      toast.error("Failed to register!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Enter details to create account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <SocialLogin />
              
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
