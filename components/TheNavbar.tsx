import { useState, useEffect } from "react";

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
import SearchModal from "./SearchModal";
import { useHotkeys } from "react-hotkeys-hook";
import OnBoardingStep1Modal from "./onBoarding/OnBoardingStep1Modal";
import OnBoardingStep2Modal from "./onBoarding/OnBoardingStep2Modal";
import OnBoardingStep3Modal from "./onBoarding/OnBoardingStep3Modal";

export const TheNavbar = () => {
	const router = useRouter();
	const { user, error, loading } = useAuth();
	const [isFirstTime, setIsFirstTime] = useState(false)

	const [showLoginPopup, setShowLoginPopup] = useState(false)
	const [showSignUp, setShowSignUp] = useState(false)
	const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false)
	const [emailFromLogin, setEmailFromLogin] = useState('')
	const [passwordFromLogin, setPasswordFromLogin] = useState('')
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [onBoardingStep, setOnBoardingStep] = useState(0)

	const [selectedOption, setSelectedOption] = useState('companies')
	const [locationTags, setLocationTags] = useState([])
	const [industryTags, setIndustryTags] = useState([])

	useHotkeys("ctrl+k, command+k", function (event) {
		event.preventDefault();
		setShowSearchModal(true);
	});

	useEffect(() => {
		//console.log("user ==", user)
		if (user) {
			//setOnBoardingStep(1)
		}
	}, [user])

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
			const response = await fetch("/api/get_access_token/", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ code, redirect_uri: 'http://localhost:3000/' }),
			}).then(res => res.json());
			window.location.href = "/";
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (router.query.code) {
			(async () => {
				//setFinishingLogin(true);
				const res = await getAccessTokenFromCode(router.query.code as string);
			})();
		}
	}, [router.query.code])

	const logout = async () => {
		const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY || "");
		magic.user.logout();
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

	const [isActive, setActive] = useState(false);

	const toggleNav = () => {
		setActive((isActive) => !isActive);
	};

	const onForgotPassword = () => {
		setShowLoginPopup(false)
		setShowForgotPasswordPopup(true)
		setShowSignUp(false)
	}

	const onBackFromForgotPassword = () => {
		setShowLoginPopup(true)
		setShowForgotPasswordPopup(false)
	}

	const onModalClose = () => {
		setShowLoginPopup(false)
		setShowForgotPasswordPopup(false)
		setShowSignUp(false)
	}

	const showLoginModal = () => {
		setShowLoginPopup(true)
		setShowForgotPasswordPopup(false)
		setShowSignUp(false)
	}

	const showSignUpModal = (email: string, password: string) => {
		setEmailFromLogin(email ? email : '')
		setPasswordFromLogin(password ? password : '')
		setShowLoginPopup(false)
		setShowForgotPasswordPopup(false)
		setShowSignUp(true)
	}

	const onCloseBoarding = () => {
		setOnBoardingStep(0);
		setSelectedOption('companies');
		setLocationTags([])
		setIndustryTags([])
	}

	return (
		<header className="overflow-y-visible z-30 shadow bg-white">
			<div className="mx-auto px-4 py-1 sm:px-6 lg:px-8">
				<nav
					className={`main-nav flex items-center justify-between w-full max-w-screen-2xl mx-auto transition-all ${
						isActive ? "nav-toggle-active" : ""
						}`}
					aria-label="Global"
				>
					<div className="flex items-center">
						<div className="flex-none lg:mr-4">
							<Link href="/" passHref>
								<a>
									<ElemLogo
										mode="logo"
										className="h-8 w-auto transition duration-200 ease-in-out scale-90 hover:scale-95 scheme-standard "
									/>
								</a>
							</Link>
						</div>
						<button
							onClick={() => {
								setShowSearchModal(true);
							}}
							className="flex items-center w-48 lg:w-64 text-left space-x-2 px-2 h-9 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm rounded-lg text-slate-400"
						>
							<IconSearch className="flex-none h-5 w-5 text-slate-600" />
							<span className="flex-auto">Quick Search...</span>
							<kbd className="text-sm font-semibold">
								<abbr title="Command" className="no-underline text-slate-400">
									⌘
								</abbr>{" "}
								K
							</kbd>
						</button>
					</div>

					<div className="flex items-center">
						<ul
							className={`${
								isActive
									? "flex h-auto opacity-100 translate-y-0"
									: "h-0 opacity-0 overflow-hidden -translate-y-6 lg:h-auto lg:opacity-100 lg:translate-y-0"
								} absolute flex-col z-40 left-4 right-4 top-14 bg-white shadow-2xl rounded-lg transition duration-300 items-center justify-center group lg:relative lg:flex lg:flex-row lg:top-0 lg:m-0 lg:p-0 lg:bg-transparent lg:shadow-none`}
						>
							{siteNav.map((navItem, i) => (
								<li key={i}>
									<Link href={navItem.path}>
										<a
											onClick={toggleNav}
											className="inline-block mx-1 px-5 py-3 font-bold transition duration-150 in-hoverTransition group-hover:opacity-50 hover:!opacity-100"
										>
											{navItem.name}
										</a>
									</Link>
								</li>
							))}
						</ul>

						<div className="flex items-center lg:ml-6">
							{/* <ElemButton onClick={logout} btn="primary">
							Logout
						 </ElemButton> */}
							{user ? (
								<UserMenu />
							) : (
									<>
										<ElemButton onClick={() => setShowLoginPopup(true)} btn="primary" arrow>
											Log In
										</ElemButton>
										<ElemButton className="ml-5" onClick={() => setShowSignUp(true)} btn="white">
											Sign Up
										</ElemButton>
									</>
								)}
							<button
								onClick={toggleNav}
								className="hamburger relative w-8 h-[22px] ml-2 p-[3px] border-0 bg-none cursor-pointer inline-block lg:hidden"
							>
								<span className="hamburger-inner block -mt-px top-1/2 transition ease-in-out duration-75 before:block before:content-[''] after:block after:content-['']"></span>
								<span className="sr-only">Toggle menu</span>
							</button>
						</div>
					</div>
					{/* </nav>
				</div>
			</header> */}
					<LoginModal onSignUp={showSignUpModal} onForgotPassword={() => setShowForgotPasswordPopup(true)} show={showLoginPopup} onClose={onModalClose} />
					<SignUpModal passwordFromLogin={passwordFromLogin} emailFromLogin={emailFromLogin} onLogin={showLoginModal} show={showSignUp} onClose={onModalClose} />
					<ForgotPasswordModal show={showForgotPasswordPopup} onClose={onModalClose} onBack={onBackFromForgotPassword} />
					{/* </>
					</div> */}

					<SearchModal
						show={showSearchModal}
						onClose={() => setShowSearchModal(false)}
					/>
					{
						(onBoardingStep === 1) &&
						<OnBoardingStep1Modal
							selectedOption={selectedOption}
							show={onBoardingStep === 1 && !loading}
							onClose={() => setOnBoardingStep(0)}
							onNext={(selectedOption) => {
								setSelectedOption(selectedOption)
								setOnBoardingStep(2)
							}}
							user={user}
						/>
					}
					{(onBoardingStep === 2) &&
						<OnBoardingStep2Modal
							locationTags={locationTags}
							industryTags={industryTags}
							show={onBoardingStep === 2 && !loading}
							onClose={() => { setOnBoardingStep(0) }}
							onNext={(locationTags, industryTags) => {
								setOnBoardingStep(3)
								setLocationTags(locationTags)
								setIndustryTags(industryTags)
							}}
							onBack={(locationTags, industryTags) => {
								setLocationTags(locationTags)
								setIndustryTags(industryTags)
								setOnBoardingStep(1)
							}}
							user={user}
						/>}
					{(onBoardingStep === 3) &&
						<OnBoardingStep3Modal
							selectedOption={selectedOption}
							locationTags={locationTags}
							industryTags={industryTags}
							show={onBoardingStep === 3 && !loading}
							onClose={() => { setOnBoardingStep(0) }}
							onNext={() => { setOnBoardingStep(0) }}
							onBack={() => setOnBoardingStep(2)}
							user={user}
						/>}
				</nav>
			</div>
		</header>
	);
};
