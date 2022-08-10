import { useState } from "react";

import Link from "next/link";
import { ElemLogo } from "./ElemLogo";
import { ElemButton } from "./ElemButton";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "../hooks/useAuth";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import  LoginModal  from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";

export const TheNavbar = () => {
	const router = useRouter();
	const { user, error, loading } = useAuth();

	const [showLoginPopup, setShowLoginPopup] = useState(false)
	const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false)

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
	}

	const onBackFromForgotPassword = () => {
		setShowLoginPopup(true)
		setShowForgotPasswordPopup(false)
	}

	const onModalClose = () => {
		setShowLoginPopup(false)
		setShowForgotPasswordPopup(false)
	}

	return (
		<>
		
		<header className="overflow-y-visible z-30">
			
			<div className="max-w-6xl mx-auto px-4 py-2 sm:px-6 lg:px-8 lg:py-4">
				<nav
					className={`main-nav flex items-center justify-between w-full max-w-screen-2xl mx-auto transition-all ${
						isActive ? "nav-toggle-active" : ""
					}`}
					aria-label="Global"
				>
					<div className="flex-none lg:mr-6">
						<Link href="/" passHref>
							<a>
								<ElemLogo
									mode="logo"
									className="h-8 w-auto transition duration-200 ease-in-out scale-90 hover:scale-95 scheme-standard "
								/>
							</a>
						</Link>
					</div>

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
										className="inline-block mx-1 px-5 py-3 font-medium transition duration-150 in-hoverTransition group-hover:opacity-50 hover:!opacity-100"
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
							<ElemButton onClick={() => setShowLoginPopup(true)}  btn="primary" arrow>
								Log In
							</ElemButton>
						)}
						<button
							onClick={toggleNav}
							className="hamburger relative w-8 h-[22px] ml-2 p-[3px] border-0 bg-none cursor-pointer inline-block lg:hidden"
						>
							<span className="hamburger-inner block -mt-px top-1/2 transition ease-in-out duration-75 before:block before:content-[''] after:block after:content-['']"></span>
							<span className="sr-only">Toggle menu</span>
						</button>
					</div>
				</nav>
			</div>
		</header>
		<LoginModal onForgotPassword={() => setShowForgotPasswordPopup(true)} show={showLoginPopup} onClose={onModalClose}/>
		<ForgotPasswordModal show={showForgotPasswordPopup} onClose = {onModalClose} onBack={onBackFromForgotPassword}/>
	</>
	);
};
