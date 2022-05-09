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
		<div>
			<div className="max-w-xl mx-auto relative z-10 py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<div className="bg-white rounded-2xl p-6 w-full flex flex-col">
					<h1 className="text-3xl lg:text-4xl font-bold">Log In</h1>
					<p className="mt-5 text-xl text-dark-400">
						Welcome to lorem ipsum...
					</p>
					<form
						onSubmit={handleSubmit}
						className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
					>
						{/* <input
						name="email"
						type="email"
						className="w-full py-2 text-xl peer bg-transparent outline-none border-b border-gray-400 focus:border-primary-500 focus:ring-opacity-0 focus:outline-none"
					/> */}
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
								className="mt-1 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
							/>
						</div>
						<div className="text-right sm:col-span-2">
							<ElemButton btn="primary">Log in</ElemButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
