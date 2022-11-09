import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import { ElemLogo } from "@/components/ElemLogo";
import { ElemButton } from "@/components/ElemButton";
//import { NotificationAlerts } from "@/components/NotificationAlerts";
import { UserMenu } from "@/components/UserMenu";
import LoginModal from "@/components/LoginModal";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import SignUpModal from "@/components/SignUpModal";
import { IconSearch } from "@/components/Icons";
import { MobileNav } from "@/components/MobileNav";
import SearchModal from "@/components/SearchModal";
import OnboardingStep1 from "@/components/Onboarding/OnboardingStep1";
import OnboardingStep2 from "@/components/Onboarding/OnboardingStep2";
import OnboardingStep3 from "@/components/Onboarding/OnboardingStep3";
import { useUser } from "@/context/userContext";

import { FC } from "react";
type Props = {
	showSignUp: boolean;
	setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TheNavbar: FC<Props> = ({ showSignUp, setShowSignUp }) => {
	const router = useRouter();
	const { user, loading } = useUser();

	const [showLoginPopup, setShowLoginPopup] = useState(
		router.asPath.includes("/login/")
	);
	//const [showSignUp, setShowSignUp] = useState(false);
	const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
	const [emailFromLogin, setEmailFromLogin] = useState("");
	const [passwordFromLogin, setPasswordFromLogin] = useState("");
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [onboardingStep, setOnboardingStep] = useState(0);

	const [selectedOption, setSelectedOption] = useState("companies");
	const [locationTags, setLocationTags] = useState<string[]>([]);
	const [industryTags, setIndustryTags] = useState<string[]>([]);
	const [linkedInError, setLinkedInError] = useState("");
	const [inviteCode, setInviteCode] = useState(
		typeof window !== "undefined" ? localStorage.inviteCode ?? "" : ""
	);

	useEffect(() => {
		if (
			!showForgotPasswordPopup &&
			!showSignUp &&
			!showLoginPopup &&
			!showSearchModal &&
			onboardingStep === 0 &&
			router.asPath.includes("/login/")
		) {
			setShowLoginPopup(router.asPath.includes("/login/"));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.asPath]);

	useHotkeys("ctrl+k, command+k", function (event) {
		event.preventDefault();
		setShowSearchModal(true);
	});

	const showOnboarding = async () => {
		const isAlreadyShown = await localStorage.getItem("onboardingShown");
		if (!isAlreadyShown) {
			setOnboardingStep(1);
			localStorage.setItem("onboardingShown", "true");
		}
	};

	useEffect(() => {
		if (!loading && user && user.isFirstLogin) {
			showOnboarding();
		}
	}, [loading, user]);

	const siteNav = [
		{
			path: "/companies",
			name: "Companies",
		},
		{
			path: "/investors",
			name: "Investors",
		},
		// {
		// 	path: "/events",
		// 	name: "Events",
		// },
	];

	const getAccessTokenFromCode = async (code: string) => {
		try {
			const response = await fetch("/api/access_token_from_code/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code,
					redirect_uri: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL,
				}),
			}); //.then((res) => res.json());
			if (response.status !== 200) {
				const responseText = await response.clone().json();
				if (responseText.message) {
					setLinkedInError(responseText.message);
					setShowLoginPopup(true);
				}
			} else {
				window.location.href = "/";
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (router.query.code) {
			(async () => {
				//setFinishingLogin(true);
				const res = await getAccessTokenFromCode(router.query.code as string);
			})();
		}
	}, [router.query.code]);

	useEffect(() => {
		if (router.query.invite && !user) {
			setInviteCode(router.query.invite as string);
			localStorage.inviteCode = router.query.invite as string;
			showSignUpModal("", "");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.invite, user]);

	const logout = async () => {
		const authRequest = await fetch("/api/logout/", {
			method: "POST",
		});
		if (authRequest.ok) {
			// We successfully logged in, our API
			// set authorization cookies and now we
			// can redirect to the dashboard!
			location.href = "/login/?loggedout";
		} else {
			/* handle errors */
		}
	};

	const onForgotPassword = () => {
		setShowLoginPopup(false);
		setShowForgotPasswordPopup(true);
		setShowSignUp(false);
	};

	const onBackFromForgotPassword = () => {
		setShowLoginPopup(true);
		setShowForgotPasswordPopup(false);
	};

	const onModalClose = () => {
		setShowLoginPopup(router.asPath.includes("/login/"));
		setShowForgotPasswordPopup(false);
		setShowSignUp(false);
	};

	const showLoginModal = () => {
		setShowLoginPopup(true);
		setShowForgotPasswordPopup(false);
		setShowSignUp(false);
	};

	const showSignUpModal = (email: string, password: string) => {
		setEmailFromLogin(email ? email : "");
		setPasswordFromLogin(password ? password : "");
		setShowLoginPopup(false);
		setShowForgotPasswordPopup(false);
		setShowSignUp(true);
	};

	const onCloseBoarding = () => {
		setOnboardingStep(0);
		setSelectedOption("companies");
		setLocationTags([]);
		setIndustryTags([]);
	};

	return (
		<header className="overflow-y-visible z-40 shadow bg-white">
			<div className="mx-auto px-1 py-1 sm:px-6 lg:px-8">
				<nav
					className="flex items-center justify-between lg:justify-start w-full max-w-screen-2xl mx-auto transition-all"
					aria-label="Global"
				>
					<div className="flex items-center">
						<div className="flex-none lg:mr-4">
							<Link href="/" passHref>
								<a>
									<ElemLogo
										mode="logo"
										className="h-6 w-auto transition duration-200 ease-in-out scale-90 scheme-standard hover:scale-95 sm:h-8"
									/>
								</a>
							</Link>
						</div>
					</div>
					<button
						onClick={() => {
							setShowSearchModal(true);
						}}
						className="hidden sm:flex sm:flex-1 items-center text-left space-x-2 mx-2 px-2 h-9 bg-white shadow-sm rounded-lg text-slate-400 ring-1 ring-slate-900/10 lg:w-64 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:flex-none"
					>
						<IconSearch className="flex-none h-5 w-5 text-dark-500" />
						<span className="flex-auto">Quick Search...</span>
						<kbd className="hidden lg:block text-sm font-semibold">
							<abbr title="Command" className="no-underline text-slate-400">
								⌘
							</abbr>{" "}
							K
						</kbd>
					</button>

					<div className="flex items-center group space-x-2 lg:space-x-3 lg:ml-auto">
						{siteNav.map((link, index) => (
							<Link href={link.path} key={index} passHref>
								<a className="hidden lg:inline-block px-2.5 py-1.5 font-bold transition duration-150 group-hover:opacity-50 hover:!opacity-100">
									{link.name}
								</a>
							</Link>
						))}

						{user ? (
							<>
								<ElemButton
									onClick={() => setShowSearchModal(true)}
									btn="slate"
									className="h-9 w-9 !px-0 !py-0 sm:hidden"
								>
									<IconSearch className="h-5 w-5" />
								</ElemButton>
								{/* <NotificationAlerts /> */}
								<UserMenu className="hidden lg:block" />
							</>
						) : (
							<>
								<ElemButton
									onClick={() => setShowLoginPopup(true)}
									btn="ol-primary"
									className="px-2.5 sm:px-3"
								>
									Log In
								</ElemButton>
								<ElemButton
									onClick={() => setShowSignUp(true)}
									btn="primary"
									className="px-2.5 sm:px-3"
								>
									Sign Up
								</ElemButton>
							</>
						)}

						<MobileNav className="flex lg:hidden items-center ml-2" />
					</div>

					<LoginModal
						linkedInError={linkedInError}
						onSignUp={showSignUpModal}
						onForgotPassword={() => setShowForgotPasswordPopup(true)}
						show={showLoginPopup}
						onClose={onModalClose}
					/>
					<SignUpModal
						inviteCode={inviteCode}
						passwordFromLogin={passwordFromLogin}
						emailFromLogin={emailFromLogin}
						onLogin={showLoginModal}
						show={showSignUp}
						onClose={onModalClose}
					/>
					<ForgotPasswordModal
						show={showForgotPasswordPopup}
						onClose={onModalClose}
						onBack={onBackFromForgotPassword}
					/>
					<SearchModal
						show={showSearchModal}
						onClose={() => setShowSearchModal(false)}
					/>
					{onboardingStep === 1 && (
						<OnboardingStep1
							selectedOption={selectedOption}
							show={onboardingStep === 1 && !loading}
							onClose={() => setOnboardingStep(0)}
							onNext={(selectedOption) => {
								setSelectedOption(selectedOption);
								setOnboardingStep(2);
							}}
							user={user}
						/>
					)}
					{onboardingStep === 2 && (
						<OnboardingStep2
							selectedOption={selectedOption}
							locationTags={locationTags}
							industryTags={industryTags}
							show={onboardingStep === 2 && !loading}
							onClose={() => {
								setOnboardingStep(0);
							}}
							onNext={(locationTags, industryTags) => {
								//setOnboardingStep(3);
								setOnboardingStep(0);
								setLocationTags(locationTags);
								setIndustryTags(industryTags);
							}}
							onBack={(locationTags, industryTags) => {
								setLocationTags(locationTags);
								setIndustryTags(industryTags);
								setOnboardingStep(1);
							}}
						/>
					)}
					{/* {onboardingStep === 3 && (
						<OnboardingStep3
							selectedOption={selectedOption}
							locationTags={locationTags}
							industryTags={industryTags}
							show={onboardingStep === 3 && !loading}
							onClose={() => {
								setOnboardingStep(0);
							}}
							onNext={() => {
								setOnboardingStep(0);
							}}
							onBack={() => setOnboardingStep(2)}
							user={user}
						/>
					)} */}
				</nav>
			</div>
		</header>
	);
};
