import { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
};

export const FigureBlurredBg: FC<PropsWithChildren<Props>> = ({
	className = "",
}) => {
	return (
		<figure
			className={`${className} absolute blur-3xl z-0 grid grid-cols-5 w-full`}
		>
			<div className="opacity-20 mix-blend-multiply filter transform-gpu animate-blob">
				<div className="max-h-96 w-[150%] aspect-square -mx-[25%] mb-20 bg-[#F8DA4B] rounded-full"></div>
			</div>
			<div className="opacity-20 mix-blend-multiply filter transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -mx-[25%] mt-36 bg-[#F72784] rounded-full"></div>
			</div>
			<div className="opacity-20  mix-blend-multiply filter transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -mx-[25%] mt-20 bg-[#7209B8] rounded-full"></div>
			</div>
			<div className="opacity-20  mix-blend-multiply filter transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -mx-[25%] mt-36 bg-[#0815EC] rounded-full"></div>
			</div>
			<div className="opacity-20 mix-blend-multiply filter transform-gpu animate-blob">
				<div className="w-[150%] aspect-square -mx-[25%] mt-24 bg-[#1BE6FF] rounded-full"></div>
			</div>
		</figure>
	);
};
