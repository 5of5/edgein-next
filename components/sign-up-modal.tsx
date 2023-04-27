import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import { ElemButton } from "@/components/elem-button";
import { InputText } from "@/components/input-text";
import { ElemLogo } from "./elem-logo";
import { IconLinkedIn, IconCheck, IconExclamationTriangle } from "./Icons";
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
	const [unsuccessMessage, setUnsuccessMessage] = useState("");
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
			return true;
		}
	};

	function isFreeEmail(email: string) {
		const pattern = /@(gmail|yahoo|hotmail)/i;
		return pattern.test(email);
	}

	const validateEmail = (value: string) => {
		setEmail(value);
		if (validator.isEmail(value)) {
			if (isFreeEmail(value)) {
				setEmailError("Please enter a work email.");
				return true;
			}
			setEmailError("");
		} else {
			setEmailError("Please enter valid Web3 email.");
			return true;
		}
	};

	const validateName = (value: string) => {
		setName(value);
		if (value.length > 0) {
			setNameError("");
		} else {
			setNameError("Please enter your full name.");
			return true;
		}
	};

	useEffect(() => {
		setName("");
		setEmail(props.emailFromLogin ? props.emailFromLogin : "");
		setPassword(props.passwordFromLogin ? props.passwordFromLogin : "");
		setIsSignUp(false);
		setIsWaitlisted(false);
		setIsRegistered(false);
		setErrorMessage("");
		setEmailError("");
		setNameError("");
		setUnsuccessMessage("");
	}, [props.show, props.emailFromLogin, props.passwordFromLogin]);

	const onLogin = () => {
		// event.preventDefault();
		// setIsLoading(true);
		props.onLogin();
	};

	const onSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsLoading(true);

		if (validateEmail(email) || validateName(name) || validate(password)) {
			setIsLoading(false);
			return;
		}
		if (!name || !email || !password) {
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch("/api/register/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
					name,
					reference_id: props.inviteCode,
				}),
			});
			if (response.status === 200) {
				localStorage.removeItem("inviteCode");
				setIsRegistered(true);
				setIsLoading(false);
			} else {
				try {
					const res = await response.clone().json();
					if (res.message && res.message.indexOf("waitlist") > 0) {
						setIsWaitlisted(true);
					} else {
						setIsLoading(false);
						setUnsuccessMessage(res.message);
					}
				} catch (err) {
					setIsLoading(false);
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
		const url = `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}&connection=linkedin&redirect_uri=${process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}&scope=openid%20profile%20email%20offline_access`;
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
						<Dialog.Panel className="max-w-lg w-full p-6 mx-auto rounded-lg shadow-2xl bg-white overflow-x-hidden overflow-y-auto overscroll-y-none scrollbar-hide lg:p-12">
							<div className="max-w-xs mx-auto w-full">
								{isRegistered ? (
									<>
										<div className="flex items-center h-12 w-12 p-2 mx-auto rounded-full shadow">
											<ElemLogo mode="icon" className="w-10 aspect-square" />
										</div>
										<h1 className="mt-4 text-2xl font-bold lg:text-3xl">
											Registration Complete
										</h1>
										<p className="mt-2 text-slate-600">
											Thank you for creating an account and joining EdgeIn.
											Verify your email and Log in to get started.
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
											btn="transparent"
											className="w-full mt-5 gap-x-2 text-center rounded-md text-[#0077B5] ring-1 ring-inset ring-black/10 hover:ring-2 hover:ring-[#0077B5] hover:text-[#0077B5] hover:bg-slate-50"
										>
											<IconLinkedIn
												title="LinkedIn"
												className="h-6 w-6 text-[#0077B5]"
											/>
											Sign up with LinkedIn
										</ElemButton>

										<div className=" flex py-3 items-center">
											<div className="flex-grow border-t border-black/10"></div>
											<span className="flex-shrink mx-4 font-bold">or</span>
											<div className="flex-grow border-t border-black/10"></div>
										</div>

										<div>
											<form onSubmit={onSignUp}>
												<div className="flex flex-col space-y-4">
													<label>
														<span className="text-sm font-medium">
															Full name
														</span>
														<InputText
															name="name"
															type="text"
															value={name}
															disabled={isLoading}
															onChange={(event) =>
																validateName(event?.target.value)
															}
															className={`${
																nameError === ""
																	? "ring-1 ring-slate-200"
																	: "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
															}`}
														/>
														{nameError === "" ? null : (
															<div className="mt-2 font-bold text-sm text-rose-400">
																{nameError}
															</div>
														)}
													</label>

													<label>
														<span className="text-sm font-medium">
															Web3 work email
														</span>
														<InputText
															name="email"
															type="email"
															value={email}
															disabled={isLoading || props.emailFromLogin != ""}
															onChange={(event) =>
																validateEmail(event?.target.value)
															}
															className={`${
																emailError === ""
																	? "ring-1 ring-slate-200"
																	: "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
															}`}
														/>
														{emailError === "" ? null : (
															<div className="mt-2 font-bold text-sm text-rose-400">
																{emailError}
															</div>
														)}
													</label>

													<label>
														<span className="text-sm font-medium">
															Password
														</span>
														<InputText
															name="password"
															type="password"
															value={password}
															disabled={
																isLoading || props.passwordFromLogin != ""
															}
															onChange={(event) =>
																validate(event?.target.value)
															}
															className={`${
																errorMessage === ""
																	? "ring-1 ring-slate-200"
																	: "ring-2 ring-rose-400 focus:ring-rose-400 hover:ring-rose-400"
															}`}
														/>
														{errorMessage === "" ? null : (
															<div className="mt-2 font-bold text-sm text-rose-400">
																{errorMessage}
															</div>
														)}
													</label>

													{unsuccessMessage && (
														<p className="mt-1 flex items-center font-bold text-sm text-red-500">
															<IconExclamationTriangle className="h-5 w-5 mr-1" />
															{unsuccessMessage}
														</p>
													)}

													<ElemButton
														//onClick={onSignUp}
														btn="primary"
														loading={isLoading}
														className="w-full mt-2"
													>
														Sign up{" "}
														{props.inviteCode ? "with referral" : "and explore"}
													</ElemButton>
												</div>
											</form>

											<div>
												<p className="mt-2 text-sm text-center text-slate-600">
													By signing up, you agree to the{" "}
													<Link href="/terms">
														<a className="hover:underline" onClick={onClose}>
															Terms
														</a>
													</Link>{" "}
													&amp;{" "}
													<Link href="/privacy">
														<a className="hover:underline" onClick={onClose}>
															Policy
														</a>
													</Link>
													.
												</p>
											</div>

											<div>
												<div className="w-full mt-6 text-sm text-center text-slate-600">
													Have an account?
													<button
														onClick={onLogin}
														className="inline ml-0.5 text-primary-500 hover:underline"
													>
														Log In
													</button>
												</div>
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
