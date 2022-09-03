import { PropsWithChildren } from "react";
import { FigureBlurredBg } from "./FigureBlurredBg";

type Props = {
	title?: string;
	subtitle?: string;
};

export const ElemHeading: React.FC<PropsWithChildren<Props>> = ({
	title,
	subtitle,
	children,
}) => {
	return (
		<section className="relative">
			<FigureBlurredBg className="-top-20 md:-top-64 lg:-top-80" />

			<div className="max-w-7xl mx-auto py-12 px-4 relative z-10 sm:px-6 lg:py-16 lg:px-8">
				<div>
					{title ? (
						<h1 className="relative max-w-3xl text-4xl lg:text-6xl font-bold">
							{title}
						</h1>
					) : (
						<h1 className="relative max-w-3xl text-4xl lg:text-6xl font-bold">
							{children}
						</h1>
					)}
					{subtitle && (
						<p className="max-w-3xl mt-5 text-xl text-slate-600">{subtitle}</p>
					)}
					{children}
				</div>
			</div>
		</section>
	);
};
