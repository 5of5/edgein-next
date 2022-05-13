import { PropsWithChildren } from "react";

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
			<div
				className="
        absolute
        top-52
        -left-6
        w-4/12
        h-96
        bg-[#F72784]
        rounded-full
        opacity-20
        mix-blend-multiply
        filter
        blur-2xl
        animate-blob
      "
			></div>
			<div
				className="
        absolute
        top-36
        left-1/4
        w-4/12
        h-96
        bg-[#7209B8]
        rounded-full
        opacity-20
        mix-blend-multiply
        filter
        blur-3xl
        animate-blob
      "
			></div>
			<div
				className="
        absolute
        top-44
        left-1/2
        w-4/12
        h-96
        bg-[#0815EC]
        rounded-full
        opacity-10
        mix-blend-multiply
        filter
        blur-xl
        animate-blob
      "
			></div>
			<div
				className="
        absolute
        top-64
        -right-4
        w-4/12
        h-96
        rounded-full
        bg-[#1BE6FF]
        opacity-20
        mix-blend-multiply
        filter
        blur-xl
        animate-blob
      "
			></div>

			<div className="max-w-6xl mx-auto py-12 px-4 relative z-10 sm:px-6 lg:py-16 lg:px-8">
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
						<p className="max-w-2xl mt-5 text-xl text-dark-400">{subtitle}</p>
					)}
					{children}
				</div>
			</div>
		</section>
	);
};
