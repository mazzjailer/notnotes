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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/contexts/sessionContext";

export default function SignUp() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const { session } = useSession();

	const handleSignUp = async () => {
		await signUp.email({
			email,
			password,
			name: `${firstName} ${lastName}`,
			callbackURL: "/",
			fetchOptions: {
				onResponse: () => {
					setLoading(false);
				},
				onRequest: () => {
					setLoading(true);
				},
				onError: (ctx) => {
					toast(ctx.error.message);
				},
				onSuccess: () => {
					router.push('/');
					router.refresh();
				}
			},
		});
	}

	return (
		<div className="flex justify-center items-center h-[65vh]">
			{!session ? (<Card className="rounded-3xl md:max-w-md max-w-sm bg-gray-100">
				<CardHeader>
					<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
					<CardDescription className="text-xs md:text-sm text-gray-700">
						Enter your information to create an account
					</CardDescription>
				</CardHeader>
				<CardContent>
				<form className="grid gap-4" 
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignUp();
                  }}
                }>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="first-name">First name</Label>
								<Input
									className='bg-white'
									id="first-name"
									placeholder="Max"
									required
									onChange={(e) => {
										setFirstName(e.target.value);
									}}
									value={firstName}
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">Last name</Label>
								<Input
									className='bg-white'
									id="last-name"
									placeholder="Robinson"
									required
									onChange={(e) => {
										setLastName(e.target.value);
									}}
									value={lastName}
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								className='bg-white'
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
							<Label htmlFor="password">Password</Label>
							<Input
								className='bg-white'
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
								placeholder="Password"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Confirm Password</Label>
							<Input
								className='bg-white'
								id="password_confirmation"
								type="password"
								value={passwordConfirmation}
								onChange={(e) => setPasswordConfirmation(e.target.value)}
								autoComplete="new-password"
								placeholder="Confirm Password"
							/>
						</div>
						<Toaster toastOptions={{
              className: 'bg-black text-white',
            }} 
            />
						<Button
							className="bg-neutral-800 text-white hover:bg-neutral-700 w-full shadow rounded-xl"
							type="submit"
							disabled={loading}
							onClick={async () => {
								handleSignUp();
							}}
						>
							{loading ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								"Create an account"
							)}
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<div className="flex justify-center w-full border-t border-gray-400 py-4">
						<p className="text-gray-700">Already have an account?</p>
						<Link href="/sign-in" className="ml-2 text-blue-500">Sign in</Link>
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