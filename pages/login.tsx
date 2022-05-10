import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { ElemButton } from "../components/ElemButton";

interface FormElements extends HTMLCollection {
	email: HTMLInputElement;
}

export default function Login() {
	const router = useRouter();
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const elements = (event.target as HTMLFormElement).elements as FormElements;

		// the Magic code
		const did = await new Magic(
			process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || ""
		).auth.loginWithMagicLink({ email: elements.email.value });

		// Once we have the did from magic, login with our own API
		const authRequest = await fetch("/api/login", {
			method: "POST",
			headers: { Authorization: `Bearer ${did}` },
		});

		if (authRequest.ok) {
			// We successfully logged in, our API
			// set authorization cookies and now we
			// can redirect to the dashboard!
			router.push("/");
		} else {
			/* handle errors */
		}
	};

	return (
		<div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
			<div className="bg-white rounded-2xl shadow-2xl p-6">
				<h1 className="text-3xl lg:text-4xl font-bold">Log In</h1>
				<p className="mt-5 text-xl text-dark-400">Welcome to lorem ipsum...</p>
				<form
					onSubmit={handleSubmit}
					className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
				>
					<div className="group mb-4 sm:col-span-2">
						<label
							htmlFor="email"
							className="text-gray-400 cursor-text group-focus-within:text-primary-500"
						>
							Email
						</label>
						<input
							name="email"
							type="email"
							className="w-full mt-1 px-3 py-3 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
						/>
					</div>
					<div className="text-right sm:col-span-2">
						<ElemButton btn="primary">Log in</ElemButton>
					</div>
				</form>
			</div>
		</div>
	);
}
