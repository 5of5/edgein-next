import { useState, useEffect, useRef, useCallback } from "react";

import Link from "next/link";
import { ElemLogo } from "./ElemLogo";
import { ElemButton } from "./ElemButton";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "../hooks/useAuth";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import LoginModal from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import SignUpModal from "./SignUpModal";
import { IconSearch } from "@/components/Icons";
import { MobileNav } from "@/components/MobileNav";
import SearchModal from "./SearchModal";
import { useHotkeys } from "react-hotkeys-hook";
import OnBoardingStep1Modal from "./onBoarding/OnBoardingStep1Modal";
import OnBoardingStep2Modal from "./onBoarding/OnBoardingStep2Modal";
import OnBoardingStep3Modal from "./onBoarding/OnBoardingStep3Modal";
import { useWeb3Auth } from "../services/web3auth";

export const TheNavbar = () => {
	const router = useRouter();
	const { user, error, loading } = useAuth();
	 const {login } = useWeb3Auth();

	const [showLoginPopup, setShowLoginPopup] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
	const [emailFromLogin, setEmailFromLogin] = useState("");
	const [passwordFromLogin, setPasswordFromLogin] = useState("");
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [onBoardingStep, setOnBoardingStep] = useState(0);

	const [selectedOption, setSelectedOption] = useState("companies");
	const [locationTags, setLocationTags] = useState<string[]>([]);
	const [industryTags, setIndustryTags] = useState<string[]>([]);
	const [linkedInError, setLinkedInError] = useState("");
	const [inviteCode, setInviteCode] = useState("");

	useHotkeys("ctrl+k, command+k", function (event) {
		event.preventDefault();
		setShowSearchModal(true);
	});

	const showOnBoarding = async () => {
		const isAlreadyShown = await localStorage.getItem("onBoardingShown");
		if (!isAlreadyShown) {
			setOnBoardingStep(1);
			localStorage.setItem("onBoardingShown", "true");
		}
	};

	const onWeb3Login = useCallback(async(user: any) => {
		const isFirstLoadAfterLogin = await localStorage.getItem("isFirstLoadAfterLogin")
		if((!isFirstLoadAfterLogin || isFirstLoadAfterLogin === "true") && user){
			localStorage.setItem("isFirstLoadAfterLogin", "false")
			if(!user.wallet_address){
				const account = await login(user.auth0_token)
				if(account){
					await fetch("/api/update_user_wallet/", {
						method: "PUT",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ wallet_address : account }),
					});//.then(res => res.json());
				}
			}
		}
	},[login])

	useEffect(() => {
		
		if(!loading && user && user.isFirstLogin){
			showOnBoarding()
		}
		if(!loading && user){
			onWeb3Login(user);
		}
	}, [loading, user, onWeb3Login]);

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
					redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL,
				}),
			}); //.then((res) => res.json());
			if (response.status == 404) {
				const responseText = await response.clone().text();
				if (responseText === "Invalid Email") {
					// showUnsuccessMessagge
					setLinkedInError(responseText);
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
			// getAccessTokenFromCode(router.query.code as string);
			(async () => {
				//setFinishingLogin(true);
				const res = await getAccessTokenFromCode(router.query.code as string);
				
			})();
		}
	}, [router.query.code]);

	useEffect(() => {
		if (router.query.invite && !user) {
			setInviteCode(router.query.invite as string);
			showSignUpModal("", "");
		}
	}, [router.query.invite, user]);

	// const logout = async () => {
	// 	const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
	// 	magic.user.logout();
	// 	const authRequest = await fetch("/api/logout/", {
	// 		method: "POST",
	// 	});
	// 	if (authRequest.ok) {
	// 		// We successfully logged in, our API
	// 		// set authorization cookies and now we
	// 		// can redirect to the dashboard!
	// 		location.href = "/login/?loggedout";
	// 	} else {
	// 		/* handle errors */
	// 	}
	// };

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
		setShowLoginPopup(false);
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
		setOnBoardingStep(0);
		setSelectedOption("companies");
		setLocationTags([]);
		setIndustryTags([]);
	};

	return (
		<header className="overflow-y-visible z-40 shadow bg-white">
			<div className="mx-auto px-1 py-1 sm:px-6 lg:px-8">
				<nav
					className="flex items-center justify-between w-full max-w-screen-2xl mx-auto transition-all"
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

						<button
							onClick={() => {
								setShowSearchModal(true);
							}}
							className="hidden sm:flex items-center text-left space-x-2 px-2 h-9 bg-white shadow-sm rounded-lg text-slate-400 ring-1 ring-slate-900/10 lg:w-64 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
					</div>

					<div className="flex items-center space-x-2 lg:space-x-3 lg:ml-6">
						{siteNav.map((link, index) => (
							<Link href={link.path} key={index} passHref>
								<a className="hidden lg:inline-block px-2.5 py-1.5 font-bold transition duration-150 group-hover:opacity-50 hover:!opacity-100">
									{link.name}
								</a>
							</Link>
						))}

						<button
							onClick={() => {
								setShowSearchModal(true);
							}}
							className="sm:hidden"
						>
							<IconSearch className="flex-none h-5 w-5 text-dark-500" />
						</button>

						{/* <ElemButton onClick={logout} btn="primary">
							Logout
						 </ElemButton> */}
						{user ? (
							<UserMenu />
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

						<MobileNav className="lg:hidden" />
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
					{onBoardingStep === 1 && (
						<OnBoardingStep1Modal
							selectedOption={selectedOption}
							show={onBoardingStep === 1 && !loading}
							onClose={() => setOnBoardingStep(0)}
							onNext={(selectedOption) => {
								setSelectedOption(selectedOption);
								setOnBoardingStep(2);
							}}
							user={user}
						/>
					)}
					{onBoardingStep === 2 && (
						<OnBoardingStep2Modal
							locationTags={locationTags}
							industryTags={industryTags}
							show={onBoardingStep === 2 && !loading}
							onClose={() => {
								setOnBoardingStep(0);
							}}
							onNext={(locationTags, industryTags) => {
								setOnBoardingStep(3);
								setLocationTags(locationTags);
								setIndustryTags(industryTags);
							}}
							onBack={(locationTags, industryTags) => {
								setLocationTags(locationTags);
								setIndustryTags(industryTags);
								setOnBoardingStep(1);
							}}
						/>
					)}
					{onBoardingStep === 3 && (
						<OnBoardingStep3Modal
							selectedOption={selectedOption}
							locationTags={locationTags}
							industryTags={industryTags}
							show={onBoardingStep === 3 && !loading}
							onClose={() => {
								setOnBoardingStep(0);
							}}
							onNext={() => {
								setOnBoardingStep(0);
							}}
							onBack={() => setOnBoardingStep(2)}
							user={user}
						/>
					)}
				</nav>
			</div>
		</header>
	);
};
