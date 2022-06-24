import { FC } from "React";

const LoaderPlasmaBubble: FC = () => {
	return (
		<span className="bubble absolute block w-full top-1/2 left-1/2 text-right before:content-[''] before:inline-block before:w-8 before:h-8 before:rounded-full before:scale-600 before:bg-[#F72784] before:shadow-[inset_0_0_15px_0_rgba(27,1,254,1),_inset_0_0_10px_0_rgba(27,1,254,1)]"></span>
	);
};

export const LoaderPlasma: FC = () => {
	return (
		<div className="plasmawrap fixed z-30 top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center bg-gray-50/70">
			<svg className="w-0 h-0">
				<filter id="gooey-plasma">
					<feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
					<feColorMatrix
						in="blur"
						mode="matrix"
						values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -16"
						result="goo"
					/>
				</filter>
			</svg>
			<div className="plasma backface-hidden relative w-36 h-36 z-20 p-0 rounded-full overflow-hidden bg-white shadow-[0_30px_60px_-12px_rgba(50,50,93,0.25),_0_18px_36px_-18px_rgba(0,0,0,0.3)">
				<div className="[filter:url('#gooey-plasma')] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 w-72 h-72 rounded-full overflow-hidden shadow-[inset_0_0_0_20px_rgba(255,64,129,1)]">
					<LoaderPlasmaBubble />
					<LoaderPlasmaBubble />
					<LoaderPlasmaBubble />
					<LoaderPlasmaBubble />
					<LoaderPlasmaBubble />
					<LoaderPlasmaBubble />
				</div>
			</div>

			<IconSpinner className="absolute z-50 top-auto bottom-auto animate-spin h-36 w-36 text-primary-400 rounded-full" />
		</div>
	);
};

type IconProps = {
	className?: string;
	title?: string;
};

export const IconSpinner: React.FC<IconProps> = ({
	className,
	title = "Loading",
}) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<title>{title}</title>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			></circle>
			<path
				className="opacity-75 ring-4 ring-primary-500"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	);
};
