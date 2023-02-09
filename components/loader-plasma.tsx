import { FC } from "react";
import { IconSpinner } from "./Icons2";

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
