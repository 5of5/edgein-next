import { Magic } from "magic-sdk";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { IconSpinner } from "../components/Icons";
import { ElemButton } from "../components/ElemButton";
import Link from "next/link";

export default function Login() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [finishingLogin, setFinishingLogin] = useState(
		Boolean(router.query.email)
	);

	const login = async (did: string | null, redirect?: string | null) => {
		// Once we have the did from magic, login with our own API
		const authRequest = await fetch("/api/login/", {
			method: "POST",
			headers: { Authorization: `Bearer ${did}` },
		});

		if (authRequest.ok) {
			// We successfully logged in, our API
			// set authorization cookies and now we
			// can redirect to the dashboard!
			// Next.js middleware needs a full refresh rather than router.push

			debugger;
			const redirectUrl = Array.isArray(router.query.redirect)
				? router.query.redirect[0]
				: router.query.redirect || redirect;
			if (redirectUrl && redirectUrl.startsWith("/")) {
				window.location.href = redirectUrl;
			} else {
				window.location.href = "/?loggedin";
			}
			// Trigger page refresh after logged in
			// window.location.reload();
		} else {
			console.log(authRequest);
			alert("Error Logging In");
			/* handle errors */
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (router.query.email) {
			(async () => {
				setFinishingLogin(true);
				const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
				const redirectUrl = Array.isArray(router.query.redirect)
					? router.query.redirect[0]
					: router.query.redirect;
				const did = await magic.auth.loginWithCredential();
				await login(did, redirectUrl);
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.email]);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await fetch("/api/login_attempt/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			// the Magic code
			const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
			const did = await magic.auth.loginWithMagicLink({
				email,
				redirectURI: location.href
			});
			await login(did);
		} catch (e) {
			console.log(e);
			alert("Error Logging In");
			setIsLoading(false);
		}
	};

	return (
		<div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 lg:py-10 lg:min-h-[40vh]">
			<div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<div className="bg-white rounded-2xl border border-dark-500/10 p-6">
					{finishingLogin ? (
						<>
							<h1 className="text-3xl lg:text-4xl font-bold">
								Redirecting...
								<IconSpinner className="animate-spin mt-2 h-5 w-5" />
							</h1>
						</>
					) : (
						<>
							<h1 className="text-3xl lg:text-4xl font-bold">Log In</h1>
							<p className="mt-2 text-xl text-dark-400">
								{"We're glad you're here."}
							</p>
							<form
								onSubmit={handleSubmit}
								className="relative grid grid-cols-1 gap-y-4 mt-6 sm:grid-cols-2 sm:gap-x-8"
							>
								<div className="group sm:col-span-2">
									<label
										htmlFor="email"
										className="text-gray-400 cursor-text group-focus-within:text-primary-500"
									>
										Email
									</label>
									<input
										name="email"
										type="email"
										value={email}
										disabled={isLoading}
										onChange={(event) => setEmail(event?.target.value)}
										placeholder="example@email.com"
										className="w-full mt-1 px-3 py-1.5 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
									/>
								</div>
								<div className="text-right sm:col-span-2">
									<ElemButton btn="primary" loading={isLoading}>
										Log in
									</ElemButton>
								</div>
							</form>
						</>
					)}
				</div>
				<div className="flex flex-col items-center justify-between mt-6 lg:flex-row">
					<h2 className="text-xl font-bold mb-2 lg:mb-0">
						Don&rsquo;t have an account?
					</h2>
					<Link href={`/waitlist`}>
						<a>
							<ElemButton btn="ol-primary">Join the waitlist</ElemButton>
						</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			metaTitle: "Login - EdgeIn.io",
		},
	};
};
