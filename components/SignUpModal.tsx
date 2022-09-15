import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import { ElemButton } from "@/components/ElemButton";
import { ElemLogo } from "./ElemLogo";
import { IconLinkedIn, IconCheck } from "./Icons";
import { Dialog, Transition } from "@headlessui/react";
const validator = require("validator");

type Props = {
	show: boolean;
	passwordFromLogin: string;
	emailFromLogin: string;
	onLogin: () => void;
	onClose: () => void;
	inviteCode: string;
};

export default function SignUpModal(props: Props) {
	const router = useRouter();

	const [isBrowser, setIsBrowser] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState(
		props.emailFromLogin ? props.emailFromLogin : ""
	);
	const [password, setPassword] = useState(
		props.passwordFromLogin ? props.passwordFromLogin : ""
	);
	const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isWaitlisted, setIsWaitlisted] = useState(false);
	const [isRegistered, setIsRegistered] = useState(false);
	const [emailError, setEmailError] = useState("");
	const [nameError, setNameError] = useState("");
	// const [finishingLogin, setFinishingLogin] = useState(
	//     Boolean(router.query.email)
	// );

	const validate = (value: string) => {
		setPassword(value);
		if (
			validator.isStrongPassword(value, {
				minLength: 8,
				minLowercase: 1,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 1,
			})
		) {
			setErrorMessage("");
		} else {
			setErrorMessage(
				"Password should have least 8 characters including a lower-case letter, an upper-case letter, a number, and a special character"
			);
		}
	};

	const validateEmail = (value: string) => {
		setEmail(value);
		if (validator.isEmail(value)) {
			setEmailError("");
		} else {
			setEmailError("Please enter valid email.");
		}
	};

	const validateName = (value: string) => {
		setName(value);
		if (value.length > 0) {
			setNameError("");
		} else {
			setNameError("Please enter your full name.");
		}
	};

	useEffect(() => {
		setIsBrowser(true);
		setName("");
		setEmail(props.emailFromLogin ? props.emailFromLogin : "");
		setPassword(props.passwordFromLogin ? props.passwordFromLogin : "");
		setIsSignUp(false);
		setIsWaitlisted(false);
		setIsRegistered(false);
		setErrorMessage("");
		setEmailError("");
		setNameError("");
	}, [props.show, props.emailFromLogin, props.passwordFromLogin]);

	const onLogin = () => {
		// event.preventDefault();
		// setIsLoading(true);
		props.onLogin();
	};

	const onSignUp = async () => {
		validateEmail(email);
		validateName(name);
		validate(password);
		if (!name || !email || !password) {
			return;
		}

		try {
			const response = await fetch("/api/register/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, name, reference_id:props.inviteCode }),
			});
			if (response.status === 200) {
				setIsRegistered(true);
			} else if (response.status === 404) {
				const waitlistRes = await response.clone().text();
				if (waitlistRes === "Invalid Email") {
					setIsWaitlisted(true);
				}
			}
		} catch (e) {
			setIsLoading(false);
		}
	};

	const onClose = () => {
		props.onClose();
	};

	const onLinkedInClick = () => {
		const url = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&connection=linkedin&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&scope=openid%20profile%20email%20offline_access`;
		window.location.href = url;
	};

	return (
		<Transition.Root show={props.show} as={Fragment}>
			<Dialog as="div" onClose={onClose} className="relative z-[60]">
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed z-10 inset-0 bg-black/20 transition-opacity backdrop-blur-sm" />
				</Transition.Child>

				<div className="fixed inset-0 z-[50] m-6 min-h-0 flex flex-col items-center justify-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-300"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel className="max-w-2xl w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-scroll overscroll-y-none lg:p-12">
							<div className="max-w-xs mx-auto w-full">
								{isRegistered ? (
									<>
										<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
											<IconCheck className="w-10 aspect-square text-primary-500" />
										</div>
										<h1 className="mt-4 text-2xl text-center font-bold lg:text-3xl">
											Registration Complete
										</h1>
										<p className="mt-2 text-center text-slate-600">
											Thank you for creating an account and joining EdgeIn. Log
											in to get started.
										</p>
										<div className="mt-6">
											<ElemButton
												className="w-full"
												onClick={onLogin}
												btn="primary"
												loading={isLoading}
											>
												Login
											</ElemButton>
										</div>
									</>
								) : isWaitlisted ? (
									<>
										<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
											<IconCheck className="w-10 aspect-square text-primary-500" />
										</div>
										<h1 className="mt-4 text-2xl text-center font-bold lg:text-3xl">
											You&rsquo;re on the list!
										</h1>
										<p className="mt-2 text-center text-slate-600">
											Your email <span className="font-bold">{email}</span> has
											been added to the waitlist. We will update you soon with
											your invite.
										</p>
									</>
								) : (
									<>
										<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
											<ElemLogo mode="icon" className="w-10 aspect-square" />
										</div>
										<h1 className="mt-4 text-2xl text-center font-bold lg:text-3xl">
											Welcome to EdgeIn
										</h1>
										<ElemButton
											roundedFull={false}
											onClick={onLinkedInClick}
											btn="white"
											className="w-full mt-5 gap-x-2 text-center rounded-md text-[#0077B5] border border-black/10 hover:text-[#0077B5] hover:border-[#0077B5] hover:bg-slate-50"
										>
											<IconLinkedIn
												title="LinkedIn"
												className="h-6 w-6 text-[#0077B5]"
											/>
											Continue with LinkedIn
										</ElemButton>

										<div className=" flex py-3 items-center">
											<div className="flex-grow border-t border-black/10"></div>
											<span className="flex-shrink mx-4 font-bold">or</span>
											<div className="flex-grow border-t border-black/10"></div>
										</div>

										<div className="flex flex-col space-y-2">
											<label>
												<input
													name="name"
													type="text"
													value={name}
													disabled={isLoading}
													onChange={(event) =>
														validateName(event?.target.value)
													}
													placeholder="Full Name"
													className={`mt-2 appearance-none rounded-md block w-full px-3 h-10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500  ${
														nameError === ""
															? "ring-1 ring-slate-200"
															: "ring-2 ring-rose-400 focus:ring-rose-400"
													}`}
												/>
												{nameError === "" ? null : (
													<div className="mt-2 font-bold text-sm">
														{nameError}
													</div>
												)}
											</label>

											<label>
												<input
													name="email"
													type="email"
													value={email}
													disabled={isLoading || props.emailFromLogin != ""}
													onChange={(event) =>
														validateEmail(event?.target.value)
													}
													placeholder="Email"
													className={`mt-2 appearance-none rounded-md block w-full px-3 h-10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500  ${
														emailError === ""
															? "ring-1 ring-slate-200"
															: "ring-2 ring-rose-400 focus:ring-rose-400"
													}`}
												/>
												{emailError === "" ? null : (
													<div className="mt-2 font-bold text-sm">
														{emailError}
													</div>
												)}
											</label>

											<label>
												<input
													name="password"
													type="password"
													value={password}
													disabled={isLoading || props.passwordFromLogin != ""}
													onChange={(event) => validate(event?.target.value)}
													placeholder="Password"
													className={`mt-2 appearance-none rounded-md w-full px-3 h-10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500  ${
														errorMessage === ""
															? "ring-1 ring-slate-200"
															: "ring-2 ring-rose-400 focus:ring-rose-400"
													}`}
												/>
												{errorMessage === "" ? null : (
													<div className="mt-2 font-bold text-sm text-rose-400">
														{errorMessage}
													</div>
												)}
											</label>

											<ElemButton
												onClick={onSignUp}
												btn="primary"
												loading={isLoading}
											>
												Sign up and explore
											</ElemButton>
											<p className="text-xs text-slate-600">
												Creating an account means you&rsquo;re okay with our{" "}
												<Link href="/terms">
													<a className="hover:text-primary-500">
														terms of service
													</a>
												</Link>
												,{" "}
												<Link href="/privacy">
													<a className="hover:text-primary-500">
														privacy policy
													</a>
												</Link>
												, and default notification settings.
											</p>

											<div>
												<ElemButton
													className="mt-4 w-full"
													onClick={onLogin}
													btn="ol-primary"
													loading={isLoading}
												>
													Login
												</ElemButton>
											</div>
										</div>
									</>
								)}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
