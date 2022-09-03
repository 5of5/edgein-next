import { ElemLogo } from "./ElemLogo";
import Link from "next/link";

export const TheFooter = () => {
	const currentYear = new Date().getFullYear();

	const navigation = {
		solutions: [
			{ name: "For founders", href: "#" },
			{ name: "For investors", href: "#" },
		],
		company: [
			// { name: "About", href: "https://www.5of5.vc/about" },
			{ name: "Team", href: "/team" },
		],
		resources: [
			{ name: "Contact", href: "/contact" },
			{ name: "Press", href: "mailto:press@5of5.vc" },
		],
		legal: [
			{ name: "Privacy", href: "/privacy" },
			{ name: "Terms", href: "/terms" },
		],
	};

	return (
		<footer className="bg-white" aria-labelledby="footer-heading">
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<div className="xl:grid xl:grid-cols-3 xl:gap-8">
					<div className="space-y-8 xl:col-span-1">
						<Link href="/">
							<a>
								<ElemLogo
									mode="logo"
									className="
                  h-8
                  w-auto
                  transition
                  duration-200
                  ease-in-out
                  scale-90
                  hover:scale-95
                  scheme-standard
                "
								/>
							</a>
						</Link>
					</div>
					<div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-bold text-dark-500 tracking-wider uppercase">
									Solutions
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.solutions.map((item) => (
										<li key={item.name}>
											<span
												className="
                    opacity-50
                    text-base
                    font-medium
                    cursor-not-allowed
                    text-dark-500
                    hover:text-dark-900
                  "
											>
												{item.name}
											</span>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-12 md:mt-0">
								<h3 className="text-sm font-bold text-dark-500 tracking-wider uppercase">
									Company
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.company.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="
                      text-base
                      font-medium
                      text-dark-500
                      hover:text-dark-900
                    "
											>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="md:grid md:grid-cols-2 md:gap-8">
							<div>
								<h3 className="text-sm font-bold text-dark-500 tracking-wider uppercase">
									Resources
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.resources.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="
                      text-base
                      font-medium
                      text-dark-500
                      hover:text-dark-900
                    "
											>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<div className="mt-12 md:mt-0">
								<h3 className="text-sm font-bold text-dark-500 tracking-wider uppercase">
									Legal
								</h3>
								<ul role="list" className="mt-4 space-y-4">
									{navigation.legal.map((item) => (
										<li key={item.name}>
											<a
												href={item.href}
												className="
                      text-base
                      font-medium
                      text-dark-500
                      hover:text-dark-900
                    "
											>
												{item.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-12 border-t border-dark-100 pt-8">
					<p className="text-sm text-dark-400 xl:text-center">
						&copy; {currentYear}
						<a
							href="https://www.edgein.io/"
							className="px-2 hover:text-dark-900"
						>
							EdgeIn.io
						</a>
						All Rights Reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};
