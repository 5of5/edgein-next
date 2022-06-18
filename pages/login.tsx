import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { ElemButton, IconSpinner } from "../components/ElemButton";


export default function Login() {
	const router = useRouter()
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [finishingLogin, setFinishingLogin] = useState(Boolean(router.query.email));

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
			
			const redirectUrl = Array.isArray( router.query.redirect) ? router.query.redirect[0] : router.query.redirect || redirect;
			if (redirectUrl && redirectUrl.startsWith('/')) {
				router.push(redirectUrl)
			} else {
				router.push("/?loggedin")
			}
		} else {
			/* handle errors */
			setIsLoading(false);
		}
	} 
	
	useEffect(() => {
		if (router.query.email) {
			(async () => {
				setFinishingLogin(true);
				const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
				const redirectUrl = Array.isArray( router.query.redirect) ? router.query.redirect[0] : router.query.redirect;
				const did = await magic.auth.loginWithCredential()
				await login(did, redirectUrl)	
			})();
		}
	}, [router.query.email])
	
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			await fetch("/api/login_attempt/", {
				method: "POST",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email})
			});

			// the Magic code
			const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
			const did = await magic.auth.loginWithMagicLink({ 
				email,
				redirectURI: location.href.indexOf('?') !== -1 ? `${location.href}&email=return` : `${location.href}?email=return`
			});
			await login(did)
		} catch (e) {
				setIsLoading(false);
		}
	};

	return (
		<div className="max-w-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
			<div className="bg-white rounded-2xl shadow-2xl p-6">
				{ finishingLogin ?
				<>
				<h1 className="text-3xl lg:text-4xl font-bold">
					Redirecting...
					<IconSpinner className="animate-spin mt-2 h-5 w-5" />
				</h1>
				</> : <>
				<h1 className="text-3xl lg:text-4xl font-bold">Log In</h1>
				<p className="mt-5 text-xl text-dark-400">
					{"We're glad you're here."}
				</p>
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
							value={email}
							disabled={isLoading}
							onChange={(event) => setEmail(event?.target.value)}
							className="w-full mt-1 px-3 py-3 text-lg text-dark-500 relative bg-white rounded-md border border-slate-300 outline-none placeholder:text-gray-300  focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100"
						/>
					</div>
					<div className="text-right sm:col-span-2">
						<ElemButton btn="primary" loading={isLoading}>Log in</ElemButton>
					</div>
				</form>
				</>}
			</div>
		</div>
	);
}
