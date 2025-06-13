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

export default function RegisterPage() {
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await registerUser({ name, email, password }).unwrap();
      toast.success("Registered successfully!");
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
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <CardFooter className="p-0 pt-4 flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  Register
                </Button>
               <SocialLogin/>
              </CardFooter>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
