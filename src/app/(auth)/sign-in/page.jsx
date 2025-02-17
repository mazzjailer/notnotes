"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
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
    callbackURL: "/notes",
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
      {!session ? (<Card className="md:max-w-md max-w-sm rounded-3xl bg-neutral-100 dark:bg-neutral-800">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl text-black dark:text-white">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
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
                className="bg-white text-black"
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
                className="bg-white text-black"
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
              <Label htmlFor="remember" className="text-neutral-700 dark:text-neutral-200 font-medium">Remember me</Label>
            </div>
            <Toaster toastOptions={{
              className: 'bg-neutral-800 dark:bg-neutral:100 text-white',
            }} 
            />
            <Button
              className="bg-neutral-800 dark:bg-neutral-100 text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-200 w-full shadow"
              type="submit"
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
            <div className="flex justify-center w-full border-t border-neutral-700 py-4">
              <CardDescription className="text-md">Don&apos;t have an account?</CardDescription>
              <Link href="/sign-up" className="ml-2 text-blue-500">Sign up</Link>
            </div>
          </CardFooter>
      </Card>) : (<Card className="bg-neutral-100 dark:bg-neutral-800">
        <CardHeader>
          <CardTitle className="text-xl text-black dark:text-white">
            You are already logged in!
          </CardTitle>
          <Link href='/notes' className="text-blue-500 hover:underline text-md">Go to your notes page &gt;</Link>
        </CardHeader>
      </Card>)}
    </div>
  );
}