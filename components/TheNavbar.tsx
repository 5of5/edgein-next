import { useState, useRef, useEffect } from "react";

import Link from "next/link";
import { ElemLogo } from "./ElemLogo";
import { ElemButton } from "./ElemButton";

export const TheNavbar = () => {
	const siteNav = [
		{
			path: "/companies",
			name: "Companies",
		},
		{
			path: "/vcfirms",
			name: "VC Firms",
		},
		{
			path: "/events",
			name: "Events",
		},
		// submenu: [
		//   {
		//     path: "/item",
		//     name: "First Item",
		//   },
		//   {
		//     path: "/item2",
		//     name: "Second Item",
		//   },
		// ],
	];

	//const ref = useRef(null);

	const [isActive, setActive] = useState<any>(false);

	// useEffect(() => {
	// 	const checkIfClickedOutside = (e: any) => {
	// 		// If the menu is open and the clicked target is not within the menu,
	// 		// then close the menu
	// 		if (isActive && ref.current && !ref.current.contains(e.target)) {
	// 			setActive(false);
	// 		}
	// 	};

	// 	document.addEventListener("mousedown", checkIfClickedOutside);

	// 	return () => {
	// 		// Cleanup the event listener
	// 		document.removeEventListener("mousedown", checkIfClickedOutside);
	// 	};
	// }, [isActive]);

	const toggleNav = () => {
		setActive(!isActive);
	};

	return (
		<header className="max-w-6xl mx-auto overflow-y-visible z-30">
			<div className="transition-all">
				<div className="px-4 py-2 lg:py-4 sm:px-6">
					<nav
						className={`flex items-center justify-between max-w-screen-2xl mx-auto ${
							isActive ? "nav-toggle-active" : ""
						}`}
						aria-label="Global"
					>
						<div className="flex-none mr-6">
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
							onClick={toggleNav}
							className={`${
								isActive ? "opacity-100" : "opacity-0 lg:opacity-100"
							} absolute flex flex-col z-40 left-0 right-0 top-8 m-6 p-4 h-auto bg-white shadow-2xl rounded-lg transition duration-150 in-hoverTransition items-center justify-center text-base lg:relative lg:flex lg:flex-row lg:top-0 lg:m-0 lg:p-0 lg:bg-transparent lg:shadow-none`}
						>
							{siteNav.map((navItem, i) => (
								<li key={i}>
									<Link href={navItem.path}>
										<a className="inline-block mx-1 px-5 py-3 transition duration-150 in-hoverTransition hover:text-primary-500">
											{navItem.name}
										</a>
									</Link>
								</li>
							))}
						</ul>

						<div className="flex items-center ml-6">
							{/* <ElemLearnMore btn="primary" btn-text="Start now" /> */}
							<ElemButton href="/" btn="primary" arrow>
								Start Now
							</ElemButton>
							<button
								onClick={toggleNav}
								className="hamburger relative w-8 h-[22px] ml-2 p-[3px] border-0 bg-none cursor-pointer inline-block lg:hidden"
							>
								<span className="hamburger-inner block -mt-px top-1/2"></span>
								<span className="sr-only">Toggle menu</span>
							</button>

							{/* <svg
								className="ml-2 h-10 w-10 p-2 cursor-pointer rounded-md text-primary-500 hover:bg-gray-100 lg:hidden"
								viewBox="0 0 25 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								onClick={toggleNav}
							>
								<path
									d="M1.5 3C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0L23.5 0C23.8978 0 24.2794 0.158035 24.5607 0.43934C24.842 0.720644 25 1.10218 25 1.5C25 1.89782 24.842 2.27936 24.5607 2.56066C24.2794 2.84196 23.8978 3 23.5 3H1.5ZM1.5 11C1.10218 11 0.720644 10.842 0.43934 10.5607C0.158035 10.2794 0 9.89782 0 9.5C0 9.10218 0.158035 8.72064 0.43934 8.43934C0.720644 8.15804 1.10218 8 1.5 8H16.5C16.8978 8 17.2794 8.15804 17.5607 8.43934C17.842 8.72064 18 9.10218 18 9.5C18 9.89782 17.842 10.2794 17.5607 10.5607C17.2794 10.842 16.8978 11 16.5 11H1.5ZM1.5 19C1.10218 19 0.720644 18.842 0.43934 18.5607C0.158035 18.2794 0 17.8978 0 17.5C0 17.1022 0.158035 16.7206 0.43934 16.4393C0.720644 16.158 1.10218 16 1.5 16H23.5C23.8978 16 24.2794 16.158 24.5607 16.4393C24.842 16.7206 25 17.1022 25 17.5C25 17.8978 24.842 18.2794 24.5607 18.5607C24.2794 18.842 23.8978 19 23.5 19H1.5Z"
									className="fill-current text-primary-500 group-hover:text-white"
								/>
							</svg> */}
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
};
