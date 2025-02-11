"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { cn } from "@/lib/utils";
import { useSession } from "@/contexts/sessionContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async () => {
    await signIn.email({
    email,
    password,
    callbackURL: "/",
    rememberMe: rememberMe,
    fetchOptions: {
      onResponse: () => {
        setLoading(false);
      },
      onRequest: () => {
        setLoading(true);
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    },
    });
  }

  const { session } = useSession();

  return (
    <div className="flex justify-center items-center h-[65vh]">
      {!session ? (<Card className="md:max-w-md max-w-sm rounded-3xl bg-gray-100">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm text-gray-700">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" 
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }}
                }>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="bg-white"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                className="bg-white"
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                className="bg-white"
                id="remember"
                onClick={() => {
                  setRememberMe(!rememberMe);
                }}
              />
              <Label htmlFor="remember" className="text-gray-700 font-medium">Remember me</Label>
            </div>
            <Toaster toastOptions={{
              className: 'bg-black text-white',
            }} 
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
            <div className="flex justify-center w-full border-t border-gray-100 py-4">
              <p className="text-gray-700">Don&apos;t have an account?</p>
              <Link href="/sign-up" className="ml-2 text-blue-500">Sign up</Link>
            </div>
          </CardFooter>
      </Card>) : (<Card className="bg-gray-100">
        <CardHeader>
          <CardTitle className="text-xl">
            You are already logged in!
          </CardTitle>
          <Link href='/' className="text-blue-500 hover:underline text-md">Go to home page &gt;</Link>
        </CardHeader>
      </Card>)}
    </div>
  );
}